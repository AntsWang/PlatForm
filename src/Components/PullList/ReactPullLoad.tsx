import * as React from 'react'
import { findDOMNode } from 'react-dom'
import { STATS } from './constants'
import * as PropTypes from 'prop-types';
import LanguageManager from '../../Language/LanguageManager';

const pullStyle = require("./ReactPullLoad.css");
/**
 * 绑定事件
 * @param obj 被绑定对象  
 * @param type  事件类型
 * @param fn    事件触发函数
 */
function addEvent(obj: any, type: any, fn: any) {
  if (obj.attachEvent) {
    obj['e' + type + fn] = fn;
    obj[type + fn] = function () { obj['e' + type + fn](window.event); }
    obj.attachEvent('on' + type, obj[type + fn]);
  } else
    obj.addEventListener(type, fn, false, { passive: false });
}
/**
 * 移除事件
 * @param obj 被绑定对象 
 * @param type  事件类型
 * @param fn    事件触发函数
 */
function removeEvent(obj: any, type: any, fn: any) {
  if (obj.detachEvent) {
    obj.detachEvent('on' + type, obj[type + fn]);
    obj[type + fn] = null;
  } else
    obj.removeEventListener(type, fn, false);
}

export default class ReactPullLoad extends React.Component<any, any> {
  private languageManager: LanguageManager = new LanguageManager();
  private HeadContent: any = {
    pulling: this.languageManager.GetErrorMsg("Pull"),
    "pulling enough": this.languageManager.GetErrorMsg("Release"),
    refreshing: this.languageManager.GetErrorMsg("Refreshing"),
    refreshed: this.languageManager.GetErrorMsg("Completed")
  }
  private startY: any;   //开始滑动是的y
  private startX: any;   //开始滑动时的x
  private defaultConfig: any; //默认配置
  static propTypes = {
    action: PropTypes.string.isRequired,     //用于同步状态
    handleAction: PropTypes.func.isRequired, //用于处理状态
    noMore: PropTypes.bool,          //是否还有更多内容可加载
    offsetScrollTop: PropTypes.number,//必须大于零，使触发刷新往下偏移，隐藏部分顶部内容
    downEnough: PropTypes.number,     //下拉满足刷新的距离
    distanceBottom: PropTypes.number, //距离底部距离触发加载更多
    isBlockContainer: PropTypes.bool,

    HeadNode: PropTypes.any,     //refresh message react dom
    FooterNode: PropTypes.any, //refresh loading react dom
  };
  //set props default values
  static defaultProps = {
    noMore: false,
    offsetScrollTop: 1,
    downEnough: 100,
    distanceBottom: 100,
    isBlockContainer: false,
    HeadNode: "",     //refresh message react dom
    FooterNode: "", //refresh loading react dom
  };

  constructor(props: any) {
    super(props);
    this.state = {
      pullHeight: 0,
      isPullUp: false
    };

  }

  componentDidMount() {
    const { isBlockContainer, offsetScrollTop, downEnough, distanceBottom } = this.props
    this.defaultConfig = {
      container: findDOMNode(this),
      offsetScrollTop: offsetScrollTop,
      downEnough: downEnough,
      distanceBottom: distanceBottom
    };
    //绑定touch事件
    addEvent(this.refs.container, "touchstart", this.onTouchStart)
    addEvent(this.refs.container, "touchmove", this.onTouchMove)
    addEvent(this.refs.container, "touchend", this.onTouchEnd)
  }

  componentWillUnmount() {
    //移除touch事件
    removeEvent(this.refs.container, "touchstart", this.onTouchStart)
    removeEvent(this.refs.container, "touchmove", this.onTouchMove)
    removeEvent(this.refs.container, "touchend", this.onTouchEnd)
  }

  componentWillReceiveProps(nextProps: any) {
    if (nextProps.action === STATS.refreshed) {
      setTimeout(() => {
        this.props.handleAction(STATS.reset)
      }, 1000)
    }
    if (nextProps.action === STATS.loaded) {
      setTimeout(() => {
        this.props.handleAction(STATS.reset)
      }, 1000)
    }
  }
  /**
   * 获取滚动距离
   */
  getScrollTop = () => {
    if (this.defaultConfig.container) {
      if (this.defaultConfig.container === document.body) {
        return document.documentElement.scrollTop || document.body.scrollTop;
      }
      return this.defaultConfig.container.scrollTop;
    } else {
      return 0;
    }
  }

  // 拖拽的缓动公式 - easeOutSine
  easing = (distance: any) => {
    // t: current time, b: begInnIng value, c: change In value, d: duration
    var t = distance;
    var b = 0;
    var d = screen.availHeight; // 允许拖拽的最大距离
    var c = d / 2.5; // 提示标签最大有效拖拽距离

    return c * Math.sin(t / d * (Math.PI / 2)) + b;
  }
  /**
   *是否可以刷新
   */
  canRefresh = () => {
    return [STATS.refreshing, STATS.loading].indexOf(this.props.action) < 0;
  }
  /**
   * 下拉
   * @param data  竖直方向坐标 起始y坐标和当前y坐标
   */
  onPullDownMove = (data: any) => {
    //正在刷新或者加载return
    if (!this.canRefresh()) return false;

    let loaderState, diff = data[0].touchMoveY - data[0].touchStartY;  //diff 滑动距离
    if (diff < 0) {
      diff = 0;
    }
    diff = this.easing(diff);
    if (diff > this.defaultConfig.downEnough) {
      loaderState = STATS.enough
    } else {
      loaderState = STATS.pulling
    }
    this.setState({
      pullHeight: diff,
    })
    this.props.handleAction(loaderState)
  }
  /**
   * 刷新
   */
  onPullDownRefresh = () => {
    if (!this.canRefresh()) return false;

    if (this.props.action === STATS.pulling) {
      this.setState({ pullHeight: 0 })
      this.props.handleAction(STATS.reset)
    } else {
      this.setState({
        pullHeight: 0,
      })
      this.props.handleAction(STATS.refreshing)
    }
  }
  /**
   * 上拉
   * @param data 坐标信息
   */
  onPullUpMove = (data: any) => {
    if (!this.canRefresh()) return false;
    this.setState({
      pullHeight: 0,
    })
    this.props.handleAction(STATS.loading)
    // }
  }
  /**
   * 触摸事件开始
   * @param event 事件对象
   */
  onTouchStart = (event: any) => {
    var targetEvent = event.changedTouches[0];
    this.startX = targetEvent.clientX;
    this.startY = targetEvent.clientY;
  }

  onTouchMove = (event: any) => {

    let scrollTop = window.pageYOffset,
      clientH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,//可视区域的高度
      scrollH = this.defaultConfig.container.scrollHeight, //获取总高度
      targetEvent = event.changedTouches[0],
      curX = targetEvent.clientX,
      curY = targetEvent.clientY,
      diffX = curX - this.startX,
      diffY = curY - this.startY;

    //判断垂直移动距离是否大于5 && 横向移动距离小于纵向移动距离
    if (Math.abs(diffY) > 5 && Math.abs(diffY) > Math.abs(diffX)) {
      //滚动距离小于设定值 &&回调onPullDownMove 函数，并且回传位置值
      if (diffY > 5 && scrollTop < this.defaultConfig.offsetScrollTop) {
        //阻止执行浏览器默认动作
        event.preventDefault();
        this.onPullDownMove([{
          touchStartY: this.startY,
          touchMoveY: curY
        }]);
      } //滚动距离距离底部小于设定值
      else if (diffY < 0 && (scrollH - scrollTop - clientH) <= 10) {
        //阻止执行浏览器默认动作
        // event.preventDefault();
        this.onPullUpMove([{
          touchStartY: this.startY,
          touchMoveY: curY
        }]);
      }
    }
  }

  onTouchEnd = (event: any) => {
    let scrollTop = this.getScrollTop(),
      targetEvent = event.changedTouches[0],
      curX = targetEvent.clientX,
      curY = targetEvent.clientY,
      diffX = curX - this.startX,
      diffY = curY - this.startY;

    //判断垂直移动距离是否大于5 && 横向移动距离小于纵向移动距离
    if (Math.abs(diffY) > 5 && Math.abs(diffY) > Math.abs(diffX)) {
      if (diffY > 5 && scrollTop < this.defaultConfig.offsetScrollTop) {
        //回调onPullDownRefresh 函数，即满足刷新条件
        this.onPullDownRefresh();
      }
    }
  }
  private renderHeader = (action: any) => {
    return <div style={{ height: "30px", display: "flex", justifyContent: "center", alignItems: "center" }}>{this.HeadContent[action]}</div>
  }
  private renderFooter = (noMore: boolean) => {
    return <div style={{ height: "30px", display: "flex", justifyContent: "center", alignItems: "center" }}>{noMore ? "没有更多数据" : "正在加载..."}</div>
  }
  render() {
    const {
      children,
      action,
      handleAction,
      noMore,
      offsetScrollTop,
      downEnough,
      distanceBottom,
      isBlockContainer,
      HeadNode,
      FooterNode,
      ...other
    } = this.props
    const { pullHeight } = this.state;
    const msgStyle = pullHeight ? {
      WebkitTransform: `translate3d(0, ${pullHeight}px, 0)`,
      transform: `translate3d(0, ${pullHeight}px, 0)`
    } : null;
    return (
      <div ref="container" className={pullStyle.pull_load_body} style={msgStyle}>
        <div className={pullStyle.pull_load_head}>
          {
            action == "pulling" || action == "pulling enough" || action == "refreshing" || action == "refreshed" ? this.renderHeader(action) : null
          }
        </div>
        {children}
        {
          noMore ? <div style={{ height: "30px", display: "flex", justifyContent: "center", alignItems: "center" }}>{this.languageManager.GetErrorMsg("NoMoreData")}</div> : null
        }
        {/* <div className="pull-load-footer">

          {
            // action == STATS.loading || noMore ? this.renderFooter(noMore) : null

          }
        </div> */}
      </div>
    )
  }
}

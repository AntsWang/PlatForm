import * as React from 'react';
import {
    BrowserRouter,
    HashRouter,
    Route,
    Link,
    Redirect,
    withRouter
} from 'react-router-dom';
import Home from '../page/Home';
import Manager from '../Page/Manager';
import Login from '../page/Login';
import LoginTest from '../Page/Login/login';
import MemberDetail from '../Page/MemberDetail';
import GameRecordDetail from '../Page/GameRecordDetail';
import ScoreRecord from '../Page/Manager/ScoreRecord';
import ReportGameResutl from '../Page/Manager/Report/ReportGameResult';
import ReportGameRecord from '../Page/Manager/Report/ReportGameRecord';
import Promotion from '../Page/Promotion';
import { LoginRoute, HomeRoute, MeRoute, ManagerRoute, MemberDetailRoute, GameRecordDetailRoute, ReportGameResutlRoute, ReportGameRecordRoute, PromotionRoute } from './Config';
import UserCtrl from '../Controller/UserCtrl';

class RoutePage extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.LoginComplete = this.LoginComplete.bind(this);
        this.state = {
            isLoginComplete: false,
        }

    }
    componentWillMount() {
        if (window.location.hash == "#/login") {
            this.setState({
                isLoginComplete: true,
            })
        }
    }

    public LoginComplete(): void {
        this.setState({
            isLoginComplete: true,
        })
    }

    render() {
        return (
            <HashRouter>
                {
                    this.state.isLoginComplete ?
                        <div style={{ height: "100%" }} >
                            <Route exact path={LoginRoute} component={LoginTest} />
                            <Route exact path={HomeRoute} component={Home} />
                            <Route path={ManagerRoute} component={Manager} />
                            <Route path={MemberDetailRoute} component={MemberDetail} />
                            <Route path={GameRecordDetailRoute} component={GameRecordDetail} />
                            <Route path={ReportGameResutlRoute} component={ReportGameResutl} />
                            <Route path={ReportGameRecordRoute} component={ReportGameRecord} />
                            <Route path={PromotionRoute} component={Promotion} />

                        </div>
                        : (<Login loginComplete={this.LoginComplete} />)
                }
            </HashRouter>
        );
    }
}

export default RoutePage;
import * as React from 'react';
import {
    Link,
    Prompt,
} from 'react-router-dom';
import { url } from 'inspector';
const styles = require("./style.css");
const logoImg = require("../../Image/limite.jpg");
export default class Home extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }
    componentWillMount() {
    }
    click = () => {
        window.location.href = "http://www.baidu.com"
    }
    render() {

        return (
            <div className={styles.home} onClick={this.click}>
                <img className={styles.img} src={logoImg} />
            </div>
        );
    }
}
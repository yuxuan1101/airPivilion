import React from 'react';
import styles from './InputBox.less';

export default class InputBox extends React.Component {
    render() {
        const from = this.props.inputBox.from;
        const to =this.props.inputBox.to;
        return (
            <div className={styles.inputBox}>
                <div className={styles.toolbar}></div>
                <div contentEditable="true" ref="input"></div>
                <div className={styles.bottom}>
                    你好 <span className={styles.from}>{from}</span>，
                    你正在对<span className={styles.to}>{to}</span> 说
                </div>
                <div className={styles.act}>
                    <button onClick={(e) => this.handleSend(from,to)} className={styles.send}>发送</button>
                    <button className={styles.ready}>准备</button>
                </div>
            </div>
        )
    }

    handleSend(from,to) {
        const node = this.refs.input;
        const text = node.innerHTML;
        this.props.onSend(from,to,text);
        node.innerHTML = "";
    }
}

InputBox.propTypes = {
    inputBox: React.PropTypes.shape({
        from: React.PropTypes.string.isRequired,
        to: React.PropTypes.string.isRequired
    }),
    onSend: React.PropTypes.func.isRequired
}
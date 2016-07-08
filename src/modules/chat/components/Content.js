import React from 'react';
import Message from './Message';
import styles from './Content.less';

export default class InputBox extends React.Component {
    render() {
        return (
            <ul className={styles.content}>
                {this.props.chatContent.map((message, index) =>
                    <Message
                        {...message}
                        key={index}
                    />
                )}
            </ul>
        )
    }
}
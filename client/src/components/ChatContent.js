/**
 * Created by yuxuan on 9/12/16.
 */
import React from 'react';
import Message from './Message';

export default class InputBox extends React.Component {
  render() {
    return (
      <ul>
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
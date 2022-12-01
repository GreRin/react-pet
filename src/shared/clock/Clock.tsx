import React from 'react';

class Clock extends React.Component<any, any> {
  timerID: number;
  constructor(props: any) {
    super(props);
    this.state = {
      date: new Date(),
      isToggleOn: true,
    };
    this.timerID = 0;
    // Эта привязка обязательна для работы `this` в колбэке.
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount(): void {
    this.timerID = window.setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount(): void {
    clearInterval(this.timerID);
  }

  tick(): void {
    this.setState({
      date: new Date(),
    });
  }

  handleClick(): void {
    this.setState((prevState: any) => ({
      isToggleOn: !prevState.isToggleOn,
    }));
  }

  render(): any {
    return (
      <div>
        <h2>Now {this.state.date.toLocaleTimeString()}.</h2>
        <button onClick={this.handleClick}>{this.state.isToggleOn ? 'Turn OFF' : 'Turn ON'}</button>
      </div>
    );
  }
}

export default Clock;

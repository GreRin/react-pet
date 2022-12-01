import React from 'react';

const withToggle = (PassedComponent: any): any =>
  class WithToggle extends React.Component<any, any> {
    constructor(props: any) {
      super(props);
      this.toggle = this.toggle.bind(this);
      this.state = {
        toggleStatus: this.props.initialToggleStatus,
      };
    }
    toggle(): any {
      this.setState({
        toggleStatus: !this.state.toggleStatus,
      });
    }
    render(): any {
      /* We deconstruct this.props so that we don't pass the
       * initialToggleStatus down to the PassedComponent because this prop is
       * only relevant to the HOC
       */
      const { initialToggleStatus, ...rest } = this.props;
      return <PassedComponent {...rest} toggle={this.toggle} toggleStatus={this.state.toggleStatus} />;
    }
  };

export default withToggle;

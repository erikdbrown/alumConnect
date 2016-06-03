import React from 'react'
import { FormControl } from 'react-bootstrap';


class ProfileField extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: ''};
  }

  componentDidMount() {
    this.setState({value: this.props.fieldDetails.value})
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps) {
      this.setState({value: nextProps.fieldDetails.value})
    }
  }

  handleFormChange (e) {
    var {id} = this.props.fieldDetails
    var formValue = e.target.value || '';

    this.setState({value: formValue});
    this.props.stageProfileEdits((editedObject) => {
      editedObject.userInfo[id] = {
        id: id,
        value: formValue
      }
    });
  }
  renderProfileField() {
    var editing = this.props.editing;
    var {title, id} = this.props.fieldDetails
    var value = this.state.value;


    //If your not editing the profile and it has a value
    //
    if(!editing && value) {
      var formattedValue = value.split('\n').map((paragraph, key) =>  {
        return <span key={key}>{paragraph}<br/></span>;
      });

      return (
        <div key={id}>
          <h3>{title}</h3>
          <p>{formattedValue}</p>
        </div>
      );
    }

    else if(editing) {
      return (
        <div key={id}>
          <h3>{title}</h3>
          <FormControl
            componentClass="textarea"
            value={value}
            ref='input'
            onChange={this.handleFormChange.bind(this)} />
        </div>
      );
    } else {
      return (<div></div>)
    }
  }

  render() {
    return (
      this.renderProfileField()
    );
  }
}

module.exports = ProfileField;

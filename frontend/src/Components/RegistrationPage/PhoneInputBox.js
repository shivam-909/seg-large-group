import React, {useState} from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'


export default class PhoneInputGfg extends React.Component {
  constructor(props) {
    super(props);
    this.state = { phone: "" };
}
  
  render(){
    return (
      <div className="number-input">
        <PhoneInput
          placeholder="Enter your phone number"
          value={this.state.phone}
          onChange={phone => this.setState({ phone })}
        />
      </div>
    );
  }
};
// function PhoneInput() {
//     // `value` will be the parsed phone number in E.164 format.
//     // Example: "+12133734253".
//     const [value, setValue] = useState()
//     return (
//       <PhoneInput
//         placeholder="Enter phone number"
//         value={value}
//         onChange={setValue}/>
//     )
//   }
  

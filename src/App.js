import React, { Component } from 'react';
import './App.css';
const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(val => val.length > 0 && (valid = false));
  return valid;
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      fname: null,
      lname: null,
      sex: null,
      confirm: null,
      company: null,
      phone:null,
      errors: {
        email: '*(ใส่ Email ของคุณให้ถูกต้อง)',
        fname: '*(ใส่ชื่อจริง)',
        lname: '*(ใส่นามสกุล)',
        sex: '*(เลือกเพศ)',
        confirm: '*(ยืนยันข้อมูล)',
        company: '*(ใส่สถานประกอบการ)',
        phone: '*(ใส่เบอร์โทรติดต่อ)',
      }
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    if (validateForm(this.state.errors)) {
      alert('ข้อมูลถูกต้องครบถ้วน');
    } else {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
    }
  }
  handleChange(event) {
    let { name, value } = event.target;
    let errors = this.state.errors;
    switch (name) {
      case 'email':
        errors.email = validEmailRegex.test(value) ? '' : '*(กรุณากรอกอีเมลให้ถูกต้อง)';
        break;
      case 'sex':
        errors.sex = value.length > 0 ? '' : '*(กรุณาเลือกเพศ)'
        break;
      case 'confirm':
        errors.confirm = value.length > 0 ? '' : '*(กรุณายืนยันข้อมูล)';
        break;
      case 'fname':
        errors.fname = value.length > 0 ? '' : '*(กรุณาใส่ชื่อจริง)';
        break;
      case 'lname':
        errors.lname = value.length > 0 ? '' : '*(กรุณาใส่นามสกุล)';
        break;
      case 'company':
        errors.company = value.length > 0 ? '' : '*(กรุณาใส่สถานประกอบการ)';
        break;
      case 'phone':
        errors.phone = value.length > 0 ? '' : '*(กรุณาใส่เบอร์โทรติดต่อ)'
      default:
        break;
    }
    this.setState({
      errors,
      [name]: value
    });
  }
  render() {
    console.log(this.state);
    let { errors } = this.state;
    return (
      
      <div>
         <form onSubmit={this.handleSubmit}>
          <h2>Registration Form</h2>
          <div class='container pt-5'>
          <div class='row'>
            <div class='col-6'>
              <label>First Name</label>
              <br/>
              <input type="text" name='fname' id='fname' size='50' onChange={this.handleChange}></input>
              {errors.fname.length > 0 && <small className="form-text text-muted">{errors.fname}</small>} 
              <br/>

              <label>Last Name </label>
              <br/>
              <input type="text" name='lname' id='lname' size='50' onChange={this.handleChange}></input>
              {errors.lname.length > 0 && <small className="form-text text-muted">{errors.lname}</small>} 
              <br/>

              <label>Company  </label>
              <br/>
              <input type="text" name='company' id='company' size='50' onChange={this.handleChange}></input>
              {errors.company.length > 0 && <small className="form-text text-muted">{errors.company}</small>} 
              <br/>

              <label>Email  </label>
              <br/>
              <input type="text" name='email' placeholder='ตัวอย่าง : example@gmail.com' size='50' value={this.state.email} onChange={this.handleChange}></input>
              {errors.email.length > 0 && <small className="form-text text-muted">{errors.email}</small>} 
              <br/> 

              <label>Phone Number</label>
              <br/>
              <input type="text" name='phone' id='phone' onChange={this.handleChange}></input>
              {errors.phone.length > 0 && <small className="form-text text-muted">{errors.phone}</small>} 
              <br/>
            </div>
          <div class='col-6'>
            <label>Sex</label>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="sex" id="gridRadios1" value="Male" onChange={this.handleChange} />
              <label class="form-check-label" for="gridRadios1">
                Male
              </label>
            </div>

            <div class="form-check">
              <input class="form-check-input" type="radio" name="sex" id="gridRadios5" value="Female" onChange={this.handleChange} />
              <label class="form-check-label" for="gridRadios5">
                Female
              </label>
              {errors.sex.length > 0 && <small className="form-text text-muted">{errors.sex}</small>}
            </div>
            

            <label>Language</label>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" name="lang[]" id="gridCheck1" value="English"/>
                <label class="form-check-label" for="gridCheck1">
                  English
                </label>
            </div>

            <div class="form-check">
              <input class="form-check-input" type="checkbox" name="lang[]" id="gridCheck2" value="Chinese"/>
                <label class="form-check-label" for="gridCheck2">
                  Chinese
                </label>
            </div>

            <div class="form-check">
              <input class="form-check-input" type="checkbox" name="lang[]" id="gridCheck3" value="Other"/>
                <label class="form-check-label" for="gridCheck3">
                 Other
                </label>
            </div>

          </div>
        </div>
      </div>

      <br/>
      
      <div class="container pt-2">
        <div class="row">
          <div class="col-12">
            <div class="form-check">
              <input type="checkbox" class="form-check-input" name="confirm" id="exampleCheck5" value="confirm" onChange={this.handleChange} />
              <label class="form-check-label" for="exampleCheck5">ยืนยันข้อมูล</label>
              <br/>
              {errors.confirm.length > 0 && <small className="form-text text-muted">{errors.confirm}</small>}
            </div>
            <br/>
            <button type="submit" className="btn btn-primary">Send</button>
          </div>
        </div>
      </div>


      
    </form> 
    </div>
    );
  }
}
export default App;
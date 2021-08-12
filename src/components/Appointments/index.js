import {Component} from 'react'
import {v4 as uuidV4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    title: '',
    date: '',
    email: '',
    FilterStarred: false,
    appointmentsList: [],
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeDate = event => {
    this.setState({date: event.target.value})
  }

  onChangeEmail = event => {
    this.setState({email: event.target.value})
  }

  onClickStarredBtn = () => {
    const {FilterStarred} = this.state
    this.setState({
      FilterStarred: !FilterStarred,
    })
  }

  onClickAdd = event => {
    const {title, date, email} = this.state
    event.preventDefault()

    const appointmentDate = date
      ? format(new Date(date), 'dd MMMM yyyy, EEEE')
      : ''
    const newAppointment = {
      id: uuidV4(),
      date: appointmentDate,
      title,
      email,
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      title: '',
      email: '',
      date: '',
    }))
  }

  onToggleIsStarred = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachItem => {
        if (id === eachItem.id) {
          return {...eachItem, isStarred: !eachItem.isStarred}
        }
        return eachItem
      }),
    }))
  }

  getFilteredAppointmentsList = () => {
    const {appointmentsList, FilterStarred} = this.state
    if (FilterStarred) {
      return appointmentsList.filter(
        eachTransaction => eachTransaction.isStarred === true,
      )
    }
    return appointmentsList
  }

  render() {
    const {date, title, email, FilterStarred} = this.state
    const FilterClassName = FilterStarred ? 'Filled' : ''
    const FilteredAppointmentsList = this.getFilteredAppointmentsList()
    return (
      <div className="appointment-con">
        <div className="main-con">
          <h1 className="heading">Add Appointment</h1>
          <div className="upper-con">
            <form className="form-con">
              <label htmlFor="title" className="label">
                TITLE
              </label>
              <input
                placeholder="Title"
                className="label-con"
                type="text"
                id="title"
                onChange={this.onChangeTitle}
                value={title}
                autoComplete="OFF"
              />
              <label htmlFor="phone" className="label">
                Phone.No/Email Id:
              </label>
              <input
                placeholder="Phone.No/Email Id"
                className="label-con"
                type="text"
                id="phone"
                onChange={this.onChangeEmail}
                value={email}
                autoComplete="OFF"
              />
              <label htmlFor="date" className="label">
                DATE
              </label>
              <input
                className="label-con"
                type="date"
                id="date"
                onChange={this.onChangeDate}
                value={date}
              />
              <button
                onClick={this.onClickAdd}
                className="add-btn"
                type="submit"
              >
                Add
              </button>
            </form>
            <img
              className="image"
              alt="appointments"
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
            />
          </div>
          <hr className="horizontal-line" />
          <div className="down-Buttons">
            <h1 className="appoint-down">Appointments</h1>
            <button
              type="button"
              className={`StarredBtn ${FilterClassName}`}
              onClick={this.onClickStarredBtn}
            >
              Starred
            </button>
          </div>
          <ul className="downPart">
            {FilteredAppointmentsList.map(eachItem => (
              <AppointmentItem
                AppointmentDetail={eachItem}
                key={eachItem.id}
                onToggleIsStarred={this.onToggleIsStarred}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments

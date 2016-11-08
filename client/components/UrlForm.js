import React, { PropTypes, PureComponent } from 'react'
import { connect } from 'react-redux'
import requestUrl from '../actions/url'
import { girdle, ref } from '../utils/index'
import url from 'url'
import keycode from 'keycode'
import { getIsRequesting } from '../stores/selectors/url'

const styles = girdle({
  urlForm: {
    display: 'block'
  },
  urlButton: {
    getState(isDisabled) {

      return [
        isDisabled && 'disabled'
      ]

    }
  },
  urlInput: {
    display: 'inline-block'
  }
})

class UrlForm extends PureComponent {

  constructor(props) {

    super(props)
    this.state = {
      url: '',
      isValidUrl: true
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.handleButtonClick = this.handleButtonClick.bind(this)

  }

  handleChange() {

    this.setState({
      url: this.input.value
    })

  }

  handleKeyPress(e) {

    if (keycode(e) === 'Enter') {

      this.requestUrl()

    }

  }

  handleButtonClick() {

    if (!this.props.isRequestingUrl) {

      this.requestUrl()

    }

  }

  requestUrl() {

    const value = this.input.value
    const parsedUrl = url.parse(value)
    const { protocol, host } = parsedUrl

    if (protocol && host) {

      this.setState({
        isValidUrl: true
      })
      this.props.requestUrl(value)

    } else {

      this.setState({
        isValidUrl: false
      })

    }

  }

  render() {

    return (
      <div>
        <input
          type='text'
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
          value={this.state.url}
          placeholder='Enter url here'
          {...ref(this, 'input')}
          {...styles.urlInput()}
        />
        <button
          {...styles.urlButton(this.props.isRequestingUrl)}
          onClick={this.handleButtonClick}
        >
          Go
        </button>
        { this.state.isValidUrl &&
          <div>Please enter a valid url</div>
        }
      </div>
    )

  }

}

UrlForm.propTypes = {
  isRequestingUrl: PropTypes.bool,
  requestUrl: PropTypes.func
}

const mapStateToProps = state => ({
  isRequestingUrl: getIsRequesting(state)
})

const mapDispatchToProps = {
  requestUrl
}

export default connect(mapStateToProps, mapDispatchToProps)(UrlForm)

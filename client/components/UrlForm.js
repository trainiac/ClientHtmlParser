import React, { PropTypes, PureComponent } from 'react'
import { connect } from 'react-redux'
import requestUrl from '../actions/url'
import { girdle, ref } from '../utils/index'
import url from 'url'
import keycode from 'keycode'
import * as fromUrl from '../stores/selectors/url'
import Color from 'color'

const buttonHoverColor = (new Color('tomato')).darken(0.1).rgbString()

const styles = girdle({
  urlForm: {
    backgroundColor: '#ddd',
    borderRadius: '5px',
    padding: '1em'
  },
  urlInputWrapper: {
    display: 'flex'
  },
  validation: {
    marginTop: '1em',
    color: 'tomato',
    fontSize: '1em',
    fontWeight: 'bold'
  },
  urlButton: {
    width: '3em',
    fontSize: '2em',
    backgroundColor: 'tomato',
    color: 'white',
    ':hover': {
      backgroundColor: buttonHoverColor
    },
    getState(isDisabled) {

      return [
        isDisabled && 'disabled'
      ]

    },
    helpers: [ 'flatBtn' ]
  },
  urlInput: {
    display: 'inline-block',
    flex: '1 100%',
    fontSize: '2em',
    padding: '0.5em',
    outline: 0,
    color: '#888',
    border: '3px solid #888',
    marginRight: '0.5em'
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
    this.handleFocus = this.handleFocus.bind(this)

  }

  handleFocus() {
    this.input.select()
  }

  handleChange() {

    this.setState({
      url: this.input.value
    })

  }

  handleKeyPress(e) {

    if (keycode(e) === 'enter') {

      this.handleButtonClick()

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
      <div {...styles.urlForm() }>
        <div {...styles.urlInputWrapper() } >
          <input
            type='text'
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
            onFocus={this.handleFocus}
            value={this.state.url}
            placeholder='Enter url here'
            {...ref(this, 'input')}
            {...styles.urlInput()}
          />
          <button
            {...styles.urlButton(
              this.props.isRequestingUrl ||
              !this.state.url
            )}
            onClick={this.handleButtonClick}
          >
            GO
          </button>
        </div>
        { !this.state.isValidUrl &&
          <div {...styles.validation() }>Please enter a valid url</div>
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
  isRequestingUrl: fromUrl.getIsRequesting(state)
})

const mapDispatchToProps = {
  requestUrl
}

export default connect(mapStateToProps, mapDispatchToProps)(UrlForm)

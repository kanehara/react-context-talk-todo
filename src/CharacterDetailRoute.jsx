import React from 'react'
import {withRouter} from 'react-router'
import {connect} from 'react-redux'
import {fetchCharacter, clearCharacter} from './actions/character'

class CharacterDetailRoute extends React.Component {
  componentDidMount () {
    this.props.dispatch(fetchCharacter(this.props.match.params.name))
  }

  componentWillUnmount () {
    this.props.dispatch(clearCharacter())
  }

  render () {
    if (this.props.character.loading) return <h3>Loading...</h3>

    const {character} = this.props.character
    if (!character) return <h3>404 Not found</h3>
    return (
      <React.Fragment>
        {this.props.auth.favoriteCharacter === character.name && <h3>*** Your favorite! ***</h3>}
        <h1>{character.name}</h1>
        <h2>Special skill: {character.specialSkill}</h2>
        <p>{character.bio}</p>
        <img src={character.imgSrc} alt={character.name} />
      </React.Fragment>
    )
  }
}

export default withRouter(connect(state => ({
  auth: state.auth,
  character: state.character
}))(CharacterDetailRoute))

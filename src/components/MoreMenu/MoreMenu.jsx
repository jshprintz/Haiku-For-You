import React, { Component } from 'react'
import { Accordion, Icon } from 'semantic-ui-react'

export default class AccordionExampleStyled extends Component {
  state = { activeIndex: 0 }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  render() {
    const { activeIndex } = this.state

    return (
      
      <Accordion styled>
        <Accordion.Title
          active={activeIndex === 0}
          index={0}
          onClick={this.handleClick}
        >
          <Icon name='dropdown' />
          What is a haiku?
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
          <h4 >
            A haiku is a form of poetry originating from Japan. A traditional haiku is three lines that contain
            a specific syllable count per line. The first line contains five syllables, the second contains seven syllables,
            and the third, like the first, contains only five syllables.
          </h4>
        </Accordion.Content>

        <Accordion.Title
          active={activeIndex === 1}
          index={1}
          onClick={this.handleClick}
        >
          <Icon name='dropdown' />
          How to write a haiku?
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 1}>
          <h4>
            In Japanese, haikus are traditionally written as a single line, whereas in English, they are separated into
            three lines. Oftentimes they are written about nature, but there are no rules when it comes to subject matter.
            Just as long as they fit the syllable count restriction (five-seven-five) and they make a complete thought.
          </h4>
          <h4>
            It's best to start with a subject matter in mind. Write more words then you need to try to articulate your thoughts.
            Then start to cross out words that don't add to the poem. Count the syllables on each line, and adjust both your
            word choices and phrasing to match the five-seven-five criteria. It's okay if the first or second line bleeds into
            the next, just make sure to wrap up the thought by the end of the third line!
          </h4>
        </Accordion.Content>

        <Accordion.Title
          active={activeIndex === 2}
          index={2}
          onClick={this.handleClick}
        >
          <Icon name='dropdown' />
          What is Haiku For You?
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 2}>
          <h4>
            Haiku For You is an app designed to both inspire and encourage reflection. On one screen, you can see a list
            of recent haikus posted by everyday people. You don't need an account to view this, but signing up does open
            several fun features:
          </h4>
          <ul>
            <li><h4>Liking posts and seeing how many others liked the same post!</h4></li>
            <li><h4>Follow poets you like and view their most recent posts on your feed and profile page!</h4></li>
            <li><h4>A section where you can write and post your own haikus!</h4></li>
            <li><h4>Access to future updates and improvements!</h4></li>
          </ul>
        </Accordion.Content>
      </Accordion>
    )
  }
}

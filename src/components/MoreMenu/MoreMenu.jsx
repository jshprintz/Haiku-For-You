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
          <p className='card-text'>
            Three common ways for a prospective owner to acquire a dog is from
            pet shops, private owners, or shelters.
          </p>
          <p className='card-text'>
            A pet shop may be the most convenient way to buy a dog. Buying a dog
            from a private owner allows you to assess the pedigree and
            upbringing of your dog before choosing to take it home. Lastly,
            finding your dog from a shelter, helps give a good home to a dog who
            may not find one so readily.
          </p>
        </Accordion.Content>
      </Accordion>
    )
  }
}

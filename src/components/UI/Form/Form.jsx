import React from 'react'
import { Form, Button, Icon } from 'semantic-ui-react'

function Form({ description, handleInputChange, handleCreate }) {
  const createBtnDisabled = description.trim() === ''
  return (
    <Form onSubmit={handleCreate}>
      <Form.Group>
        <Form.Input
          name='description'
          placeholder='description *'
          value={description}
          onChange={handleInputChange}
        />
        <Button icon labelPosition='right' disabled={createBtnDisabled}>
          Create<Icon name='add' />
        </Button>
      </Form.Group>
    </Form>
  )
}

export default Form
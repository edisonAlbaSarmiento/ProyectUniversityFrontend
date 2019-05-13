import React from 'react';
import { Create, SimpleForm, TextInput, LongTextInput} from 'react-admin';

const Component = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" />
            <LongTextInput source="short_description" />
            <TextInput source="description" />
        </SimpleForm>
    </Create>
)
export default Component

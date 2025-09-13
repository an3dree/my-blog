import React, { Component } from 'react';
import { db } from '../services/firebase';
import { addDoc, collection } from 'firebase/firestore';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import AddTag from './AddTag';
import Tag from "./Tag";

const postsRef = collection(db, "Posts");

interface ITag {
    key: number,
    name: string
}

interface AddPostState {
    title: string;
    content: string;
    tagName: string;
    tagIsSelected: boolean;
    tags: ITag[];
    selectedTags: ITag[];
}

class AddPost extends Component<{}, AddPostState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            title: '',
            content: '',
            tags: [{ key: 1, name: 'manga' }, { key: 2, name: 'gaming' }, { key: 3, name: 'tech' }, { key: 4, name: 'pessoal' }],
            tagName: '',
            selectedTags: [],
            tagIsSelected: false
        }
    }

    handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        addDoc(postsRef, {
            title: this.state.title,
            content: this.state.content,
            tags: this.state.selectedTags.map(tags => tags.name)
        }).then(() => {
            alert('Post sucesfuly added!');
            this.setState({ title: '', content: '', selectedTags: [], tags: [{ key: 1, name: 'manga' }, { key: 2, name: 'gaming' }, { key: 3, name: 'tech' }, { key: 4, name: 'pessoal' }] });

        });
    }

    onSelect = (key: number) => {
        const selectedTag = this.state.tags.find(tag => tag.key === key) as ITag
        this.state.selectedTags.push(selectedTag);
        const _tags: ITag[] = this.state.tags.filter(tag => tag.key !== key);
        this.setState({
            tags: _tags
        });
    };

    onClose = (key: number) => {
        const closedTag = this.state.selectedTags.find(tag => tag.key === key) as ITag;
        const _selectedTags = this.state.selectedTags.filter(tag => tag.key !== key);
        this.state.tags.push(closedTag);
        this.setState({
            selectedTags: _selectedTags
        });
    };


    componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<AddPostState>, snapshot?: any): void {
        console.log(this.state)
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                }}>

                <h2>Criar nova postagem</h2>

                <Form.Group className='mb-5'
                    style={{
                        width: "70%"
                    }}>
                    <Form.Label
                        style={{
                            display: "flex",
                            textAlign: "left",
                            marginLeft: "10px"
                        }}>
                        Título:
                    </Form.Label>
                    <Form.Control
                        type='text'
                        value={this.state.title}
                        onChange={(e) => this.setState({ title: e.target.value })}
                    />
                </Form.Group>

                <Form.Group className='mb-5'
                    style={{
                        width: "70%"
                    }}>
                    <Form.Label style={{
                        display: "flex",
                        textAlign: "left",
                        marginLeft: "10px"
                    }}>
                        Conteúdo:
                    </Form.Label>
                    <Form.Control
                        as="textarea" rows={5}
                        value={this.state.content}
                        onChange={(e) => this.setState({ content: e.target.value })}
                    />
                    {/*
                    <textarea
                        value={this.state.content}
                        onChange={(e) => this.setState({ content: e.target.value })}
                    />
                     */ }
                </Form.Group>

                <Form.Group className='mb-5' style={{
                    width: "70%"
                }}>
                    <Form.Label style={{
                        display: "flex",
                        textAlign: "left",
                        marginLeft: "10px"
                    }}>
                        Tags:
                    </Form.Label>
                    <div style={{
                        display: "flex",
                        flexDirection: "row"
                    }}>
                        <div style={{
                            display: "block",
                            width: "50%"
                        }}>
                            {this.state.tags.map((tag) => (<Tag onSelectClick={() => this.onSelect(tag.key)} isSelected={false} key={tag.key} color="secondary" name={tag.name} />))

                            }
                        </div>
                        <div style={{ border: "solid", borderColor: "grey", borderWidth: 1 }}></div>
                        <div style={{
                            display: "block",
                            width: "50%"
                        }}>
                            {!!this.state.selectedTags ?
                                this.state.selectedTags.map((tag) => (<Tag onClocseClick={() => this.onClose(tag.key)} isSelected={true} key={tag.key} color="primary" name={tag.name} />)) : <></>}

                        </div>
                    </div>

                </Form.Group>
                <Button variant='primary' type='submit'>Criar postagem</Button>
            </Form>
        );
    }
}

export default AddPost;
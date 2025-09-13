import React, { Component } from 'react';
import { db } from '../services/firebase';
import { collection, getDoc, addDoc, getDocs, doc } from 'firebase/firestore';
import { Post } from '../models/Post';
import { User } from '../models/User';
import Card from 'react-bootstrap/Card';
import { Container } from 'react-bootstrap';


interface PostListState {
    posts: Post[];
    postTags: String[];
}

const usersRef = collection(db, "Users");
const postsRef = collection(db, "Posts");

async function getAuthor(authorId: string): Promise<User> {

    const docRef = doc(usersRef, authorId);
    const docSnap = await getDoc(docRef);
    var user: User = {
        email: docSnap.data()?.email,
        userId: docSnap.id,
        username: docSnap.data()?.username,
        name: docSnap.data()?.name
    };
    //console.log(docSnap.metadata);
    return user;
}

class PostList extends Component<{}, PostListState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            posts: [],
            postTags: []
        };
    }

    async componentDidMount() {

        getDocs(postsRef).then((querySnapshot) => {
            const posts: Post[] = [];
            querySnapshot.forEach((doc) => {
                //console.log(doc.metadata);
                posts.push({
                    id: doc.id,
                    ...doc.data()
                } as Post);
            });
            //console.log(posts);
            let tags: string[] = [];
            posts.forEach((post) => {
                if (tags.length === 0) {
                    tags.push()
                }
            });

            this.setState({ posts });
        });


    }

    render() {
        return (
            <Container>
                Ultimas postagens...
                {this.state.posts.map((post) => (

                    <Card key={post.id} className='mb-3'
                        style={{
                            width: '35rem',
                            textAlign: 'left'
                        }}>
                        <Card.Body>
                            <Card.Title>{post.title}</Card.Title>
                            <Card.Subtitle className='mb-2 text-muted'>Aqui vai a data{/*post.createdAt.getDate()*/}</Card.Subtitle>
                            <Card.Text>
                                {post.content}
                            </Card.Text>
                            <Card.Link>Continuar lendo...</Card.Link>
                        </Card.Body>

                    </Card>))}
            </Container>

        );
    }
}

export default PostList;
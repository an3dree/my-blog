import React, { Component } from 'react';
import { db } from '../services/firebase';
import { collection, getDoc, addDoc, getDocs, doc } from 'firebase/firestore';
import { Post } from '../models/Post';
import { User } from '../models/User';


interface PostListState {
    posts: Post[];
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
    console.log(user);
    return user;
}

class PostList extends Component<{}, PostListState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            posts: [],
        };
    }

    async componentDidMount() {

        getDocs(postsRef).then((querySnapshot) => {
            const posts: Post[] = [];
            querySnapshot.forEach((doc) => {
                posts.push({
                    id: doc.id,
                    ...doc.data()
                } as Post);
            });
            console.log(posts);
            this.setState({ posts });
        });

        /*
        var _posts: Post[] = [];
        getDocs(postsRef)
            .then((docs) => {

                docs.forEach(doc => {
                    _posts.push({
                        content: doc.data().content,
                        createdAt: doc.data().createdAt,
                        createdBy: doc.data().authorId,
                        id: doc.id,
                        title: doc.data().title
                    })
                });
                this.setState({
                    posts: _posts
                });

            })
            .catch(e => console.error(e));
            */

        /*
        db.collection('posts').get().then((querySnapshot) => {
          const posts: Post[] = [];
          querySnapshot.forEach((doc) => {
            posts.push({
              id: doc.id,
              ...doc.data()
            } as Post);
          });
          this.setState({ posts });
        });
        */
    }

    render() {
        return (
            <div>
                <h1>Blog Posts</h1>
                <ul>
                    {this.state.posts.map((post) => (
                        <li key={post.id}>
                            <h2>{post.title}</h2>
                            <p>{post.content}</p>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default PostList;
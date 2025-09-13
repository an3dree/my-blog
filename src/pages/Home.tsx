import React from "react";
import PostList from "../components/PostList";

class Home extends React.Component<{}, {}> {
    constructor(props: {}) {
        super(props);
    }
    render() {
        return (
            <div style={{
                display: "flex",
                flexDirection: "row"
            }}>
                <PostList />
                <div style={{
                    width: "30%"
                }}>
                    <span>Filtros</span>
                </div>
            </div>


        );
    }
}

export default Home;
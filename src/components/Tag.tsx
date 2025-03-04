import React from "react";
import { Badge, CloseButton } from "react-bootstrap";

interface TagProps {
    name: string;
    color: string;
    isSelected: boolean;
    onClocseClick?: () => void;
    onSelectClick?: () => void;
}

class Tag extends React.Component<TagProps, {}> {
    constructor(props: TagProps) {
        super(props);
        this.state = {

        }
    }

    render(): React.ReactNode {
        return (
            <Badge onClick={this.props.onSelectClick}
                style={{
                    marginRight: 2,
                    marginLeft: 2
                }} pill bg={this.props.color}>
                {this.props.name}
                {this.props.isSelected &&
                    <CloseButton onClick={this.props.onClocseClick}
                        style={{
                            width: 8, height: 8,
                            marginLeft: 5

                        }} />
                }
            </Badge>
        );
    }
}

export default Tag;
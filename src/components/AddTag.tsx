import React from "react";
import Tag from "./Tag";
import { CloseButton, Stack } from "react-bootstrap";

interface AddTagState {
    name: string;
    isSelected: boolean;
    tags: ITag[];
    selectedTags: ITag[];
}

interface AddTagProps {
    selectedTags: string[];
}

interface ITag {
    key: number,
    name: string
}


class AddTag extends React.Component<AddTagProps, AddTagState> {
    constructor(props: AddTagProps) {
        super(props);
        this.state = {
            name: '',
            isSelected: false,
            tags: [{ key: 1, name: 'manga' }, { key: 2, name: 'gaming' }, { key: 3, name: 'tech' }, { key: 4, name: 'pessoal' }],
            selectedTags: []
        }
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

    componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<AddTagState>, snapshot?: any): void {
        console.log(this.state)
    }

    render(): React.ReactNode {
        return (
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


        );
    }
}

export default AddTag;
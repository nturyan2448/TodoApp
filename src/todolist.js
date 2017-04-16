import React from 'react';
import TodoItem from './todoitem';

class ListHeader extends React.Component{
    constructor(props){
        super(props);
        this.state = {edit: false, listname: this.props.children, itemName: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAddItem = this.handleAddItem.bind(this);
        this.handleCheckItem = this.handleCheckItem.bind(this);
        this.handleDeleteItem = this.handleDeleteItem.bind(this);
        this.handleItemChange = this.handleItemChange.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDeleteList = this.handleDeleteList.bind(this);
    }

    handleChange(e){
        this.setState({listname: e.target.value});
    }
    handleSubmit(e){
        // alert("List submitted: " + this.state.value);
        e.preventDefault();
        this.setState({listname: this.state.listname, edit: false});
        // console.log(this.state.lists);
    }

    handleAddItem(e){
        e.preventDefault();
        this.props.hAI(this.props.index, this.state.itemName);
        this.setState({itemName: ''});
        // this.props.itemList.push({status: 'todo', value: this.state.itemName});
        // alert(this.state.itemName);
    }

    handleCheckItem(){

    }

    handleDeleteItem(){

    }

    handleItemChange(e){
        this.setState({itemName: e.target.value})
    }

    handleEdit(){
        if (this.state.edit === false){
            this.setState({edit: true});
        }
    }

    handleDeleteList(){
        this.props.hDL(this.props.index);
    }

    render(){
        let iList = this.props.itemList;
        iList = iList.map((x,index) => {
            if (typeof x === 'undefined') return null;
            else return <TodoItem key={index} lindex={this.props.index} index={index} className={x.status}
                                hCI={this.props.hCI} hDI={this.props.hDI}>{x.value}</TodoItem>;
        })
        // console.log(this.props.index)
        let renderlist;
        if (this.state.edit){
            renderlist = <form className="editListName" onSubmit={this.handleSubmit}>
                <input type="text" value={this.state.listname} onChange={this.handleChange} />
            </form>
        }
        else {
            renderlist = <section>{this.state.listname}</section>;
        }
        return (
            <div className="todolist">
                <div className="listHeader">
                    {renderlist}
                    <form onSubmit={this.handleAddItem}>
                        <input type="text" value={this.state.itemName} 
                            placeholder="Add a new item" onChange={this.handleItemChange}/>
                    </form>
                    <div>
                        <button className="edit" value="edit" onClick={this.handleEdit}>edit</button>
                        <button className="delete" value="delete" onClick={this.handleDeleteList}>delete</button>
                    </div>
                </div>
                <div className="itemList">  
                    {iList}
                </div>
            </div>
        )
    }
}

export default ListHeader
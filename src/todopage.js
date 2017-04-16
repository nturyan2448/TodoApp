import React from 'react';
import ListHeader from './todolist';

class TodoPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  value: '', 
                        lists: [],
                        doneTodo: 0,
                        undoneTodo: 0 };

        this.handleListChange = this.handleListChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDeleteList = this.handleDeleteList.bind(this);
        this.handleAddItem = this.handleAddItem.bind(this);
        this.handleCheckItem = this.handleCheckItem.bind(this);
        this.handleDeleteItem = this.handleDeleteItem.bind(this);
    }
    handleListChange(e){
        this.setState({value: e.target.value});
    }
    handleSubmit(e){
        e.preventDefault();
        this.state.lists.push({text: this.state.value, itemList: []})
        this.setState({lists: this.state.lists, value: ''})
    }
    handleDeleteList(lindex){
        // console.log('delete index: ' + lindex);
        // console.log(this.state.lists)
        let deletedLists = this.state.lists;
        let todo = 0, done = 0;
        for(let i = 0; i < deletedLists[lindex].itemList.length; i++){
            if (typeof deletedLists[lindex].itemList[i] === 'undefined') continue;
            else if (deletedLists[lindex].itemList[i].status === 'todo') todo++;
            else if (deletedLists[lindex].itemList[i].status === 'done') done++;
        }
        delete deletedLists[lindex];
        this.setState({lists: deletedLists});
        this.setState((prev) => ({doneTodo: prev.doneTodo - done,
                                  undoneTodo: prev.undoneTodo - todo}))
    }
    handleAddItem(lidx,name){
        this.state.lists[lidx].itemList.push({status: 'todo', value: name})
        this.setState((prev) => ({undoneTodo: prev.undoneTodo+1}));
    }
    handleCheckItem(lidx, iidx,done){
        if(done){
            let temp = this.state.lists
            temp[lidx].itemList[iidx].status = 'done'
            this.setState((prev) => ({lists: temp,
                                      doneTodo: prev.doneTodo+1,
                                      undoneTodo: prev.undoneTodo-1}));
        }
        else {
            let temp = this.state.lists
            temp[lidx].itemList[iidx].status = 'todo'
            this.setState((prev) => ({lists: temp,
                                      doneTodo: prev.doneTodo-1,
                                      undoneTodo: prev.undoneTodo+1}));
        }
    }
    handleDeleteItem(lidx, iidx, done){
        let temp = this.state.lists;
        delete temp[lidx].itemList[iidx];
        if(done){
            this.setState((prev) => ({lists: temp,
                                      doneTodo: prev.doneTodo-1,}));
        }
        else {
            this.setState((prev) => ({lists: temp,
                                      undoneTodo: prev.undoneTodo-1}));
        }
    }
    render(){
        let divlist = this.state.lists
        divlist = divlist.map((x,index) => {if (typeof x === 'undefined') return null;
                                            else return <ListHeader key={index}
                                                index={index} itemList={x.itemList}
                                                hDL={this.handleDeleteList} hAI={this.handleAddItem} 
                                                hCI={this.handleCheckItem} hDI={this.handleDeleteItem}
                                                >{x.text}</ListHeader>});
        // console.log(this.state.lists);
        return(
        <div>
            <div>
                <h1>TODO LISTS</h1>
                <p className="countItem">
                    {this.state.doneTodo} todo(s) done <br/>
                    {this.state.undoneTodo} todo(s) left
                </p>
            </div>

            <form onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Add a new list" 
                    value={this.state.value} onChange={this.handleListChange} />
            </form>
            <div className="lists">
                {divlist}
            </div>
        </div>
        )
    }
}

export default TodoPage
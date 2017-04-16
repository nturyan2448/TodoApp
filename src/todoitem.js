import React from 'react';

class TodoItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = { status: 'todo'};

        this.handleCheckItem = this.handleCheckItem.bind(this);
        this.handleDeleteItem = this.handleDeleteItem.bind(this);
    }

   handleCheckItem(e) {
       if (e.target.checked) {
           this.props.hCI(this.props.lindex,this.props.index,true);
           this.setState({status: 'done'});
       }
       else {
           this.props.hCI(this.props.lindex,this.props.index,false);
           this.setState({statue: 'todo'});
       }
   }

   handleDeleteItem(e){
       let temp = true;
       if (this.state.status === 'todo') temp = false;
       this.props.hDI(this.props.lindex,this.props.index,temp);
   }
    
    render(){
        return (
        <div className={this.props.className}>
            <input type="checkbox" onClick={this.handleCheckItem}/>
            <div>
                {this.props.children}
            </div>
            <button className="deleteItem" value="delete" onClick={this.handleDeleteItem}>delete</button>
        </div>
        );
    }
}

export default TodoItem;

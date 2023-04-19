import logo from './logo.svg';
import './App.css';
import React from 'react';

class Element{
  constructor(elementId, elementName, elementType, isRequired){
    this.elementId = elementId;
    this.elementName = elementName;
    this.elementType = elementType;
    this.isRequired = isRequired;
    this.childElements = new Array();
  }
}


class Object extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      objects : [],
      count : 0
    };
    this.addElement = this.addElement.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    // this.addChildElement = this.addChildElement.bind(this);
    // this.generateChildElementJSX = this.generateChildElementJSX.bind(this);
  }

  addElement(){
    this.setState(prevState=>
      ({
        objects: [...prevState.objects, new Element(prevState.count + 1, "addName", "String", false)],
        count: prevState.count+1
      }));
    }

    handleEdit(elementId, fieldType, event){
      const value = event.target.value;
      const checked = event.target.checked;
      this.setState(prevState=>{
        const prevElement = prevState.objects[elementId-1];
        let newElement = null;
        if(fieldType == "elementName"){
          newElement = new Element(prevElement.elementId, value, prevElement.elementType, prevElement.isRequired);
        }
        else if(fieldType == "elementType"){
          newElement = new Element(prevElement.elementId, prevElement.elementName, value, prevElement.isRequired);
        }
        else if(fieldType == "isRequired"){
          newElement = new Element(prevElement.elementId, prevElement.elementName, prevElement.elementType, checked);
        }
        prevState.objects[elementId-1] = newElement;
        return {objects: prevState.objects};
      });
      console.log(this.state);
    }


    deleteElement(elementId){
      this.setState(prevState=>{
        prevState.objects.slice(elementId).forEach(element => {
          element.elementId = element.elementId - 1;
        });
        const newObjects = prevState.objects.slice(0, elementId-1).concat(prevState.objects.slice(elementId));
        console.log(prevState.objects.slice(elementId), newObjects);
        return ({
          objects: newObjects,
          count: prevState.count-1
        });
      });
    }

    // addChildElement(element){
    //   this.setState(prevState=>{
    //     const id = prevState.objects[element.elementId-1].childElements.length + 1;
    //     const newObjects = prevState.objects[element.elementId-1].childElements.concat(new Element(id, "addName", "String", false));
    //     return ({
    //       objects: newObjects,
    //       count: prevState.count
    //     });
    //   });
    // }

    // generateChildElementJSX(element, output){
    //   if(this.state.objects[element.elementId - 1].childElements.length == 0){
    //     return output;
    //   }
    //   for (let i in this.state.objects[element.elementId - 1].childElements){
    //     const n = i.elementId * 2;
    //     output.push(<p>{n*" "} {i.elementId} {this.generateElementNameField(i.elementName, i.elementId)} {this.generateElementTypeField(i.elementType, i.elementId)} {this.generateIsRequiredField(i.isRequired, i.elementId)}  {this.generateDeleteButton(i.elementId)} </p>);
    //     this.generateChildElementJSX(i, output);
    //   }
    // }

    generateElementNameField(elementName, elementId){
      return <input value={elementName} onChange={this.handleEdit.bind(this, elementId, "elementName")}/>;
    }

    generateElementTypeField(elementType, elementId){
      return (
      <select value={elementType} onChange={this.handleEdit.bind(this, elementId, "elementType")} >
        <option value="String">STRING</option>
        <option value="Number">NUMBER</option>
        <option value="Boolean">BOOLEAN</option>
        <option value="Object">OBJECT</option>
      </select>
    );
    }

    generateIsRequiredField(isRequired, elementId){
      return (
        <input type='checkbox' checked={isRequired} onChange={this.handleEdit.bind(this, elementId, "isRequired")}/>
      );
    }

    generateDeleteButton(elementId) {
      return <button onClick={()=>this.deleteElement(elementId)}>Delete</button> ;
    }
  


  render(){
    const objectsList = this.state.objects.map((i)=> <p>{i.elementId} {this.generateElementNameField(i.elementName, i.elementId)} {this.generateElementTypeField(i.elementType, i.elementId)} <strong>Is Required?</strong>{this.generateIsRequiredField(i.isRequired, i.elementId)} {this.generateDeleteButton(i.elementId)}</p> );
    return (
    <div>
    <button onClick={this.addElement}>Add Element</button>
    {objectsList}
    </div>);
  }
}


function App() {
  return (
    <Object/>
  );
}

export default App;
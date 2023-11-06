import './App.css';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useState } from 'react';
export function SortableItem (props) {
    const {attributes, listeners, setNodeRef, transform, transition}= useSortable({id: props.id});
    const style ={
        transform: CSS.Transform.toString(transform),
        transition,
    }
    //console.log(props.id);
    return (
        // <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        <label for={`myCheckbox+${props.id}`}>
            <div ref={setNodeRef} style={style} {...attributes} {...listeners} key={props.id}>
              <img className='w-full' src={props.img} alt="" />
           </div>
        </label>
        // </div>
    )
};

export default SortableItem;
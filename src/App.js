import './App.css';
import Img1 from '../src/images/image-1.webp';
import Img2 from '../src/images/image-2.webp';
import Img3 from '../src/images/image-3.webp';
import Img4 from '../src/images/image-4.webp';
import Img5 from '../src/images/image-5.webp';
import Img6 from '../src/images/image-6.webp';
import Img7 from '../src/images/image-7.webp';
import Img8 from '../src/images/image-8.webp';
import Img9 from '../src/images/image-9.webp';
import Img10 from '../src/images/image-10.jpeg';
import Img11 from '../src/images/image-11.jpeg';
import Uploader from '../src/images/uploader.png';
import {DndContext, closestCenter} from "@dnd-kit/core";
import {arrayMove, horizontalListSortingStrategy, rectSortingStrategy, rectSwappingStrategy, SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import { useState } from 'react';
import SortableItem from './SortableItem';
function App() {
  const images= [
    {
      id: '1',
      img: Img1
    },
    {
      id: '2',
      img: Img2
    },
    {
      id: '3',
      img: Img3
    },
    {
      id: '4',
      img: Img4
    },
    {
      id: '5',
      img: Img5
    },
    {
      id: '6',
      img: Img6
    },
    {
      id: '7',
      img: Img7
    },
    {
      id: '8',
      img: Img8
    },
    {
      id: '9',
      img: Img9
    },
    {
      id: '10',
      img: Img10
    },
    {
      id: '11',
      img: Img11
    }
  ];
  const [languages, setLanguages] = useState(images);
  //console.log(languages);
  const handleDragEnd = event =>{
    //console.log("Drag End called");
    const {active, over} = event;
    //console.log("active ", active?.id);
    //console.log("over ", over?.id);
    if(active?.id!==over?.id){
      setLanguages((items) =>{
        // const oldIndex = items.indexOf(active.id);
        const oldIndex = items.findIndex(item => item.id === active.id);
        // const newIndex = items.indexOf(over.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        // console.log(arrayMove(items, oldIndex, newIndex));
        return arrayMove(items, oldIndex, newIndex);
      })
    }
  }
  let [isChecked, setisChecked]= useState([]);
  const [unChecked, setUnChecked] = useState([]);

  const handlecheckbox = (e)=>{
    const {value, checked}= e.target;
    console.log(value, checked);
    if(e.target.checked)
    {
      console.log(value);
      setisChecked([...isChecked, value]);
    } else if(!checked){
      console.log(value);
      setisChecked(isChecked.filter(a=> a!== value))
    }
    console.log(isChecked)
  }
  const handleDelete = () => {
    isChecked.map((a) => {
      const selector = languages.map((language) => language.id).indexOf(a);
      if (selector !== -1) {
        languages.splice(selector, 1);
      }
       setLanguages(languages);
    });
      setisChecked([])  
  };
  
  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
    <div>
      <div className="gallery container mx-auto mt-32">
        <h2 className="text-3xl font-bold mb-8">Gallery</h2>
        <div className={`flex justify-between ${isChecked.length==0? 'invisible': 'visible'}`}>
        <h3 className='text-3xl'>{isChecked.length} items selected</h3>
        <button onClick={handleDelete} className="btn bg-red-500 text-white mx-8 px-4">Delete</button>
        </div>
      <div className="grid grid-cols-5 gap-4">
        <SortableContext items={languages} strategy={rectSortingStrategy}>
        {console.log(languages)}
            {
              languages?.map(language=> <div className={`image-box bg-red-100 border-solid rounded border-2 border-indigo-600 mt-8 ${languages.indexOf(language)===0? 'row-span-2 col-span-2': ''}`}>
              <input id={`myCheckbox${language.id}`} type="checkbox" name="" value={language.id} onChange={(e)=>handlecheckbox(e)}/>
              {/* {console.log("isChecked "+isChecked)} */}
              <SortableItem key={language?.id} id={language.id} img={language?.img} i={languages.indexOf(language)}></SortableItem>
              </div>)
            }
            <div className='mt-10'>
            <img src={Uploader} alt="" />
            </div>
        </SortableContext>
        {/* {
          images.map((image, index)=> 
            <div key={image.id} className={`image-box bg-red-100 border-solid rounded border-2 border-indigo-600 ${image===images[0]? 'row-span-2 col-span-2': null}`}>
              <img className='w-full group-hover:scale-125 transition-all duration-500' src={image.img} alt="" />
           </div>
          )
        }     */}
    </div>
    
      </div>
    </div>
    </DndContext>
  );

}

export default App;

import styles from "../src/main.css";
import amalaImage from "../src/assets/amala.svg"  
import React from "react";
import ReactDOM, { createRoot } from "react-dom/client";
// import { createRoot } from "react-dom/client";
const useState = React.useState
const useEffect = React.useEffect

function App() {

    const [meals, setMeals] = useState({
  Amala: [1, 500, "Assets/black amala 2.svg"],
  Ewedu: [1, 500, "Assets/EWEDU 2.svg"],
  Gbegiri: [1, 500, "Assets/gbegiri 2.svg"],
})

     useEffect(() => {
    if (localStorage.getItem("mealData")) {
      setMeals(JSON.parse(localStorage.getItem("mealData")))
    }
  }, [])



  useEffect(() => {
    localStorage.setItem("mealData", JSON.stringify(meals))
  }, [meals])

  return (
    <>
     
      <TrayContent meals= {meals} setMeals={setMeals}/>
      
    </>
  )
}


function TrayContent(props){
    const mealList = Object.keys(props.meals);

   return ( mealList.map((meal) => {
        return (
        <div>
            <div className= "tray__item__image" id="tray-item-image">
                        <img src= "../src/assets/amala.svg"/>

                        {/* <img src="${meals[mealList[i]][2]}"> */}

                       <div className="tray__item__name" id="tray-item-name">
                          {meal}
                       </div>

                         <div className="button">
                                <button> Remove</button>
                           </div>

                            </div>

                    <div className="tray__item__details">

                        
                        <div className="tray__item__price" id="tray-item-price">
                            {/* <p>₦${meals[mealList[i]][1]}</p> */}
                        
                        </div>

                        <div className="tray__item__count">
                           <button id="item-count-reduce">-</button>
  
                            {/* <p>${meals[mealList[i]][0]}</p>  */}
                            <button >+</button>
                            
                        </div>



                    </div>
                </div>


        

            

        )
    })
   )


}

const app = document.getElementById("app")
const root= createRoot(app)
root.render(<App />);


if (module.hot) {
  module.hot.accept();
}
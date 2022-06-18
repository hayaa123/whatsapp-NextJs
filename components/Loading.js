import {Circle} from "better-react-spinkit"
function Loading(){
    return (
        <center style={{display:"grid",placeItems:"center",height:"100vh"}}>
            <div>
                <img 
                src="https://conniescomfortsuites.com/wp-content/uploads/2018/03/WHATSAPP-LOGO.png"
                height={200}
                style = {{marginButtom:10}}
                />

              <Circle color="#27a71a" size={60} />
            </div>
        </center>
    )
}

export default Loading


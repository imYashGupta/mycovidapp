import React,{ useState ,useRef,useEffect} from 'react'
import { StyleSheet, Text, View,TouchableNativeFeedback,ScrollView,Dimensions } from 'react-native'
import { THEME } from '../util/THEME';
import Entypo from 'react-native-vector-icons/Entypo';
import moment from "moment";
const TODAY_DATE=moment().format('YYYY-MM-DD');

const DateSlider = ({dates,onDateChange}) => {
    const flatListRef = useRef()
    const [dynamicIndex, setDynamicIndex] = useState(dates.length);
    const [disableRight, setDisableRight] = useState(true)
    const [disableLeft, setDisableLeft] = useState(false)
    const clickHandler = (direction) =>{    

        let width= (Dimensions.get("screen").width-140);
        if(direction=='right'){
            if(dynamicIndex===dates.length){
                return;
            }
            else{
                let totalWidth = width * (dynamicIndex+1);
                flatListRef.current?.scrollTo({
                    x:totalWidth-width,
                    animated : true
                });
                setDynamicIndex(dynamicIndex+1)
                onDateChange(dynamicIndex+1);
            }
        }
        if(direction=="left"){
            if(dynamicIndex <= 1){
                 console.log("yes",dynamicIndex)
                setDynamicIndex(1);
                return;
            }
            let totalWidth = width * (dynamicIndex-1);
            flatListRef.current?.scrollTo({
                x:totalWidth-width,
                animated : true
            });
            setDynamicIndex(dynamicIndex-1)
            onDateChange(dynamicIndex-1);
        } 
    }
    const onScrollEnd = (e) => {
        let pageNumber=Math.round(e.nativeEvent.contentOffset.x / (Dimensions.get("screen").width-140)) ;        
        setDynamicIndex(pageNumber+1)
        onDateChange(pageNumber+1);
    }

    const toBottom = () => {
        flatListRef.current.scrollToEnd({animated: true});
    }

    useEffect(() => {
        if(dynamicIndex===dates.length){
            setDisableRight(true);
        }else{
            setDisableRight(false);
        }
        if(dynamicIndex===1){
            setDisableLeft(true)
        }
        else{
            setDisableLeft(false)
        }
    }, [dynamicIndex])

    const renderDate = (date) => {
        if(date===TODAY_DATE){
            return "Today"
        }
        else{
            return moment(date,'YYYY/MM/DD').format("DD MMMM");
        }
    }

    return (
        <View style={{height:50,flexDirection:"row",justifyContent:"center",alignItems:"center",elevation:20}}>
                <View style={{borderRadius:40,overflow:"hidden",height:40,width:40,marginLeft:10,elevation:20}}>
                    <TouchableNativeFeedback onPress={() => clickHandler('left')}>
                        <View style={{height:40,width:40,borderRadius:40,backgroundColor:THEME.CARD,overflow:"hidden",justifyContent:"center",alignItems:"center",}}>
                            <Entypo name="chevron-small-left" color={disableLeft? "grey" :"white"} size={26}/>
                        </View>
                    </TouchableNativeFeedback>
                </View>
                <View style={{flex:1,backgroundColor:"transparent",marginHorizontal:20,borderRightColor:"red",borderRightWidth:0}}>
                    <ScrollView 
                    // pagingEnabled
                        horizontal 
                        showsHorizontalScrollIndicator={false}
                        onMomentumScrollEnd={onScrollEnd}
                        ref={flatListRef}             
                        onContentSizeChange={() => toBottom()}
                        snapToAlignment={"center"}     
                    >{
                        dates.map(d => {
                          return (<View key={d} style={{width:Dimensions.get("screen").width-140,height:50,justifyContent:"center"}}><Text style={{color:"white",textAlign:"center",fontSize:16}}>{renderDate(d)}</Text></View>)
                        })
                    }
                    </ScrollView>
                </View>
                <View style={{borderRadius:40,overflow:"hidden",height:40,width:40,marginRight:10,elevation:20}}>
                    <TouchableNativeFeedback onPress={() => clickHandler('right')}>
                        <View style={{height:40,width:40,borderRadius:40,backgroundColor:THEME.CARD,overflow:"hidden",justifyContent:"center",alignItems:"center"}}>
                            <Entypo name="chevron-small-right" color={disableRight? "grey" :"white"} size={26}/>
                        </View>
                    </TouchableNativeFeedback>
                </View>
            </View>
    )
}

export default DateSlider


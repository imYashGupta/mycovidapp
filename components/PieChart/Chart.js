import React from 'react';
import { View } from 'react-native';
import Pie from "react-native-fab-pie";
import MyLabels from './Lables';
import { THEME } from '../../util/THEME';

export default class MyApp extends React.PureComponent {
    constructor(props) {
        //console.log(props.data);
        super(props);
        // const data = [33.33, 33.33, 33.33];
        const data = props.data;
        const colors = [THEME.GREEN, THEME.SUBJECT, THEME.EQUIPMENT];

        const pieData = data
            .filter(value => {
                // console.log(value.color)
                return value.percent > 0;
            })
            .map((v, index) => {
                const toRet = {
                    value: v.percent,
                    title: v.name,
                    color: v.color,
                    key: `pie-${index}`,
                };
                return toRet;
            });

        this.state = {
            pieData,
        };
    }

    componentDidMount() {
        this.pie.current.animate();
    }

    animate = () => {
        this.pie.current.reset().then(this.pie.current.animate);
    };

    pie = React.createRef();

    render() {
        return (
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor:THEME.SECONDARY,
                    elevation:5,
                    borderRadius:10,
                }}
            >
              
                <Pie
                    ref={this.pie}
                    containerStyle={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginVertical: 30,
                    }}
                    pieStyle={{
                        width: 260,
                        height: 200,
                        flex: 1,
                    }}
                    outerRadius={90}
                    innerRadius={35}
                    data={this.state.pieData}
                    animate
                >
                    <MyLabels />
                </Pie>
                {/* <Button title="animate" onPress={this.animate} /> */}
            </View>
        );
    }
}

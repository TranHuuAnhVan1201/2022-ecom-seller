import React, { useState, useCallback, useEffect } from "react";
// import { View, StyleSheet, Dimensions, Platform } from "react-native";
//Select box
// import RNPickerSelect from "react-native-picker-select";
// import { MaterialIcons } from "@expo/vector-icons";
//Provinces
import ProvincesData from "../../../../../_untils/address/ProvincesHCM";
import Provinces from "../../../../../_untils/address/ProvincesHCM";

const Address = ({ getInfo }) => {
    const [selectedProvince, setselectedProvince] = useState("");
    const [selectedTown, setselectedTown] = useState("");
    const initialTown = [{ label: "Chọn Quận/Huyện", value: "1" }];
    const [getTowns, setGetTowns] = useState(initialTown);

    useEffect(() => {
        getInfo(selectedProvince, selectedTown);
    }, [selectedProvince, selectedTown]);

    //Filter Towns
    const townsFilter = useCallback(
        (name) => {
            if (name.target.value === "1") {
                setselectedTown("");
            } else {
                console.log(name.target.value);
                
                const towns = ProvincesData.filter(
                    (province) => province.name === name.target.value
                );
                const town = towns.map((town) => {
                    const result = Object.keys(town.cities).map((key) => {
                        return town.cities[key];
                    });
                    const townsFilter = result.map((town) => {
                        return { label: town, value: town };
                    });
                    return townsFilter;
                });
                console.log(town);
                console.log(town[0]);
                setselectedProvince(name.target.value);
                setGetTowns(town[0]);
            }

        },

        [selectedProvince]
    );

    return (
        <div>
            <div>
                <label>Tỉnh / Thành phố</label>
                <select className="form-select"
                    onClick={(value) => townsFilter(value)}
                    onTouchStart={(value) => townsFilter(value)}
                    onChange={(value) => townsFilter(value)}

                >
                    <option value="1" >Tỉnh / Thành Phố.</option>
                    {
                        Provinces.map((value, key) => {
                            return (
                                <option value={value.name} key={key}  >{value.name}</option>
                            )

                        })
                    }
                </select>
                <label>Quận / Huyện</label>
                <select className="form-select"
                    onClick={(value) => setselectedTown(value.target.value)}
                    onTouchStart={(value) => setselectedTown(value.target.value)}
                    onChange={(value) => setselectedTown(value.target.value)}
                >
                    <option value="" >Quận / Huyện</option>
                    {
                        getTowns ?
                            getTowns.map((value, key) => {
                                return (
                                    <option value={value.value} key={key}  >{value.value}</option>
                                )

                            })
                            : null
                    }
                </select>
            </div>
        </div>

    );
};


export default Address;
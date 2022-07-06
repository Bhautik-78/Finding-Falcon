import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Select, Input, Radio, Space, Button, message} from 'antd';
import {findFalcon, getPlanetDetail, getVehiclesDetail} from "../Action";

message.config({top: 50});

const FindFalcon = () => {
    let navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [planets, setPlanets] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [selectedPlanetsName, setSelectedPlanetsName] = useState({
        destination1: "",
        destination2: "",
        destination3: "",
        destination4: "",
    });
    const [selectedVehicleName, setSelectedVehicleName] = useState({
        destination1: "",
        destination2: "",
        destination3: "",
        destination4: "",
    });
    const [value, setValue] = useState("");

    useEffect(() => {
        getPlanets();
        getVehicles()
    }, []);

    const getPlanets = async () => {
        setLoading(true);
        const res = await getPlanetDetail();
        if (res && res.success) {
            setLoading(false);
            setPlanets(res.data)
        } else {
            setLoading(false);
        }
    };

    const getVehicles = async () => {
        setLoading(true);
        const res = await getVehiclesDetail();
        if (res && res.success) {
            setLoading(false);
            setVehicles(res.data)
        } else {
            setLoading(false);
        }
    };

    const onFindFalcone = async () => {
        const planetsList = Object.values(selectedPlanetsName);
        const vehiclesList = Object.values(selectedVehicleName);
        setLoading(true);
        const res = await findFalcon(planetsList, vehiclesList);
        if (res && res.success) {
            setLoading(false);
            navigate("/result", {state: {data: res.data, timeTaken: getTimeTaken()}});
        } else {
            setLoading(false);
            message.error("something went wrong")
        }
    };

    const onChange = (value, name) => {
        setSelectedPlanetsName({...selectedPlanetsName, [name]: value})
    };

    const onRadioChange = (e) => {
        setSelectedVehicleName({...selectedVehicleName, [e.target.name]: e.target.value});
    };

    const distanceCheck = (value, distance) => {
        const planet = planets.find(item => item.name === value)
        return planet.distance > distance;
    };

    const getTimeTaken = () => {
        let total = 0;
        if (selectedPlanetsName.destination1 && selectedVehicleName.destination1) {
            const planet = planets.find(item => item.name === selectedPlanetsName.destination1);
            const vehicle = vehicles.find(item => item.name === selectedVehicleName.destination1)
            total += ((planet?.distance || 0) / (vehicle?.speed || 0) || 0)
        }
        if (selectedPlanetsName.destination2 && selectedVehicleName.destination2) {
            const planet = planets.find(item => item.name === selectedPlanetsName.destination2);
            const vehicle = vehicles.find(item => item.name === selectedVehicleName.destination2)
            total += ((planet?.distance || 0) / (vehicle?.speed || 0) || 0)
        }
        if (selectedPlanetsName.destination3 && selectedVehicleName.destination3) {
            const planet = planets.find(item => item.name === selectedPlanetsName.destination3);
            const vehicle = vehicles.find(item => item.name === selectedVehicleName.destination3)
            total += ((planet?.distance || 0) / (vehicle?.speed || 0) || 0)
        }
        if (selectedPlanetsName.destination4 && selectedVehicleName.destination4) {
            const planet = planets.find(item => item.name === selectedPlanetsName.destination4);
            const vehicle = vehicles.find(item => item.name === selectedVehicleName.destination4)
            total += ((planet?.distance || 0) / (vehicle?.speed || 0) || 0)
        }
        return total
    };

    return (
        <div className="container">
            <div className="mt-5">
                <h3>Select planets you want to search in:</h3>
            </div>
            <div className="row mt-5 height-300">
                <div className="col-2">
                    <h6>Destination 1</h6>
                    <div className="mb-4">
                        <Select
                            showSearch
                            placeholder="Select"
                            optionFilterProp="children"
                            onChange={(value) => onChange(value, "destination1")}
                            filterOption={(input, option) =>
                                (option.children).toLowerCase().includes(input.toLowerCase())
                            }
                        >
                            {planets.filter(item => !(Object.values(selectedPlanetsName).includes(item.name))).map(items =>
                                <Select.Option key={items.name} value={items.name}>{items.name}</Select.Option>)}
                        </Select>
                    </div>
                    {selectedPlanetsName.destination1 &&
                    <div>
                        <Radio.Group name="destination1" onChange={onRadioChange}
                                     value={selectedVehicleName.destination1}>
                            <Space direction="vertical">
                                {
                                    vehicles.map((items, index) =>
                                        <Radio
                                            disabled={distanceCheck(selectedPlanetsName.destination1, items.max_distance) ||
                                            (Object.values(selectedVehicleName).filter(item => item === items.name).length === items.total_no &&
                                                selectedVehicleName.destination1 !== items.name)
                                            }
                                            className="d-flex justify-content-lg-start"
                                            key={index}
                                            value={items.name}
                                        >
                                            {items.name}({selectedVehicleName.destination1 === items.name ?
                                            Object.values(selectedVehicleName).filter(item => item === items.name).length > 1 ?
                                                (items.total_no - Object.values(selectedVehicleName).filter(item => item === items.name).length) +
                                                Object.values(selectedVehicleName).filter(item => item === items.name).length - 2
                                                :
                                                (items.total_no - Object.values(selectedVehicleName).filter(item => item === items.name).length) +
                                                Object.values(selectedVehicleName).filter(item => item === items.name).length - 1
                                            :
                                            items.total_no - Object.values(selectedVehicleName).filter(item => item === items.name).length})
                                        </Radio>
                                    )
                                }
                            </Space>
                        </Radio.Group>
                    </div>}
                </div>
                <div className="col-2">
                    <h6>Destination 2</h6>
                    <div className="mb-4">
                        <Select
                            showSearch
                            placeholder="Select"
                            optionFilterProp="children"
                            onChange={(value) => onChange(value, "destination2")}
                            filterOption={(input, option) =>
                                (option.children).toLowerCase().includes(input.toLowerCase())
                            }
                        >
                            {planets.filter(item => !(Object.values(selectedPlanetsName).includes(item.name))).map(items =>
                                <Select.Option key={items.name} value={items.name}>{items.name}</Select.Option>)}
                        </Select>
                    </div>
                    {selectedPlanetsName.destination2 &&
                    <div>
                        <Radio.Group name="destination2" onChange={onRadioChange}
                                     value={selectedVehicleName.destination2}>
                            <Space direction="vertical">
                                {
                                    vehicles.map((items, index) =>
                                        <Radio
                                            disabled={distanceCheck(selectedPlanetsName.destination2, items.max_distance) ||
                                            (Object.values(selectedVehicleName).filter(item => item === items.name).length === items.total_no &&
                                                selectedVehicleName.destination2 !== items.name)
                                            }
                                            className="d-flex justify-content-lg-start"
                                            key={index}
                                            value={items.name}
                                        >
                                            {items.name}({selectedVehicleName.destination2 === items.name ?
                                            Object.values(selectedVehicleName).filter(item => item === items.name).length > 1 ?
                                                (items.total_no - Object.values(selectedVehicleName).filter(item => item === items.name).length) +
                                                Object.values(selectedVehicleName).filter(item => item === items.name).length - 2
                                                :
                                                (items.total_no - Object.values(selectedVehicleName).filter(item => item === items.name).length) +
                                                Object.values(selectedVehicleName).filter(item => item === items.name).length - 1
                                            :
                                            items.total_no - Object.values(selectedVehicleName).filter(item => item === items.name).length})
                                        </Radio>
                                    )
                                }
                            </Space>
                        </Radio.Group>
                    </div>}
                </div>
                <div className="col-2">
                    <h6>Destination 3</h6>
                    <div className="mb-4">
                        <Select
                            showSearch
                            placeholder="Select"
                            optionFilterProp="children"
                            onChange={(value) => onChange(value, "destination3")}
                            filterOption={(input, option) =>
                                (option.children).toLowerCase().includes(input.toLowerCase())
                            }
                        >
                            {planets.filter(item => !(Object.values(selectedPlanetsName).includes(item.name))).map(items =>
                                <Select.Option key={items.name} value={items.name}>{items.name}</Select.Option>)}
                        </Select>
                    </div>
                    {selectedPlanetsName.destination3 &&
                    <div>
                        <Radio.Group name="destination3" onChange={onRadioChange}
                                     value={selectedVehicleName.destination3}>
                            <Space direction="vertical">
                                {
                                    vehicles.map((items, index) =>
                                        <Radio
                                            disabled={distanceCheck(selectedPlanetsName.destination3, items.max_distance) ||
                                            (Object.values(selectedVehicleName).filter(item => item === items.name).length === items.total_no &&
                                                selectedVehicleName.destination3 !== items.name)
                                            }
                                            className="d-flex justify-content-lg-start"
                                            key={index}
                                            value={items.name}
                                        >
                                            {items.name}({selectedVehicleName.destination3 === items.name ?
                                            Object.values(selectedVehicleName).filter(item => item === items.name).length > 1 ?
                                                (items.total_no - Object.values(selectedVehicleName).filter(item => item === items.name).length) +
                                                Object.values(selectedVehicleName).filter(item => item === items.name).length - 2
                                                :
                                                (items.total_no - Object.values(selectedVehicleName).filter(item => item === items.name).length) +
                                                Object.values(selectedVehicleName).filter(item => item === items.name).length - 1
                                            : items.total_no - Object.values(selectedVehicleName).filter(item => item === items.name).length})
                                        </Radio>
                                    )
                                }
                            </Space>
                        </Radio.Group>
                    </div>}
                </div>
                <div className="col-2">
                    <h6>Destination 4</h6>
                    <div className="mb-4">
                        <Select
                            showSearch
                            placeholder="Select"
                            optionFilterProp="children"
                            onChange={(value) => onChange(value, "destination4")}
                            filterOption={(input, option) =>
                                (option.children).toLowerCase().includes(input.toLowerCase())
                            }
                        >
                            {planets.filter(item => !(Object.values(selectedPlanetsName).includes(item.name))).map(items =>
                                <Select.Option key={items.name} value={items.name}>{items.name}</Select.Option>)}
                        </Select>
                    </div>
                    {selectedPlanetsName.destination4 &&
                    <div>
                        <Radio.Group name="destination4" onChange={onRadioChange}
                                     value={selectedVehicleName.destination4}>
                            <Space direction="vertical">
                                {
                                    vehicles.map((items, index) =>
                                        <Radio
                                            disabled={distanceCheck(selectedPlanetsName.destination4, items.max_distance) ||
                                            (Object.values(selectedVehicleName).filter(item => item === items.name).length === items.total_no &&
                                                selectedVehicleName.destination4 !== items.name)
                                            }
                                            className="d-flex justify-content-lg-start"
                                            key={index}
                                            value={items.name}
                                        >
                                            {items.name}({selectedVehicleName.destination4 === items.name ?
                                            Object.values(selectedVehicleName).filter(item => item === items.name).length > 1 ?
                                                (items.total_no - Object.values(selectedVehicleName).filter(item => item === items.name).length) +
                                                Object.values(selectedVehicleName).filter(item => item === items.name).length - 2
                                                :
                                                (items.total_no - Object.values(selectedVehicleName).filter(item => item === items.name).length) +
                                                Object.values(selectedVehicleName).filter(item => item === items.name).length - 1
                                            : items.total_no - Object.values(selectedVehicleName).filter(item => item === items.name).length})
                                        </Radio>
                                    )
                                }
                            </Space>
                        </Radio.Group>
                    </div>}
                </div>
                <div className="col-3">
                    <h2>Time taken: {getTimeTaken()}</h2>
                </div>
            </div>
            <div>
                <Button
                    disabled={(Object.values(selectedPlanetsName).filter(item => item !== "").length !== 4) || (Object.values(selectedVehicleName).filter(item => item !== "").length !== 4)}
                    onClick={() => onFindFalcone()}
                >
                    Find Falcone!
                </Button>
            </div>
        </div>
    )
};

export default FindFalcon;

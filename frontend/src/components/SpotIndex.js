import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route, useParams } from 'react-router-dom';
import SpotIndexItem from "./SpotIndexItem";

const SpotIndex = ({ spot }) => {
    return (
        <SpotIndexItem
            spot={spot}
        />

    );
}

export default SpotIndex;
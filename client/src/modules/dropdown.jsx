import React, { useState, useEffect, useRef } from "react";
import "../font.css";
import abovearrow from "../assets/abovearrow.png";
import underarrow from "../assets/underarrow.png";

const SelectBox = ({
  items, title, height, fontSize, paddingTop, selectItem
}) => {
  // state = {
  //   items: this.props.items || [],
  //   title: this.props.title,
  //   height: this.props.height,
  //   fontSize: this.props.fontSize,
  //   paddingTop: this.props.paddingTop,
  //   showItems: false,
  //   selectedItem: this.props.items && this.props.items[0],
  //   selectItem: this.props.SelectItem
  // };

  const dropdownRef = useRef(null)
  const dropdownListRef = useRef(null)
  const [width, setWidth] = useState(0)
  const [showItems, setShowItems] = useState(false)
  const [selectedItem, setSelectedItem] = useState(items ? items[0] : null)

  useEffect(() => {
    handleWindowResize()
    window.addEventListener("resize", handleWindowResize)

    return () => {
      window.removeEventListener("resize", handleWindowResize)
    }
  }, [dropdownRef])
  const handleWindowResize = () => {
    // console.log(dropdownRef.current.offsetWidth)
    setWidth(dropdownRef.current.offsetWidth)
  }
  const dropDown = () => {
    // this.setState((prevState) => ({
    //   showItems: !prevState.showItems
    // }));
    setShowItems(!showItems)
  };

  const handleClick = (item) => {
    // this.setState({
    //   selectedItem: item,
    //   showItems: false
    // });
    setShowItems(false)
    // setSelectedItem(item)
    selectItem(title, item, setSelectedItem)
  };

  // render() {
    return (
      <div className="select-box--box">
        <div
          className="select-box-container--open"
          // className={`${
          //   showItems
          //     ? "select-box--container--open"
          //     : "select-box--container--close"
          // }`}
        >
          <div
            className='select-box--container'
            // className={`${
            //   showItems
            //     ? "select-box--container--close2"
            //     : "select-box--container"
            // }`}
            ref={dropdownRef}
          >
            <div
              className="select-box--selected-item"
              onClick={dropDown}
              style={{
                fontSize:
                  (title === "Origin") &
                  (selectedItem.value !== "All")
                    ? "1.5vmin"
                    : "2.3vmin",
                paddingTop:
                  selectedItem.value === "All"
                    ? null
                    : paddingTop
              }}
            >
              {selectedItem.value === "All"
                ? title
                : selectedItem.value}
            </div>
            <div className="select-box--arrow" onClick={dropDown}>
              {showItems ? (
                <img
                  draggable="False"
                  src={abovearrow}
                  alt="logo1"
                />
              ) : (
                <img
                  draggable="False"
                  src={underarrow}
                  alt="logo1"
                />
              )}
            </div>
          </div>
          <div
              style={{
                display: showItems ? "block" : "none",
                width: width ? width : 'auto',
              }}
              className={"select-box--items"}
              ref={dropdownListRef}
            >
              {items.map((item) => (
                <div
                  key={item.id}
                  onClick={() =>
                    handleClick(
                      // title,
                      item,
                      // this.selectItem
                    )
                  }
                  className={selectedItem === item ? "selected" : ""}
                >
                  {item.value}
                </div>
              ))}
            </div>
        </div>
      </div>
    );
  // }
}

export default SelectBox;

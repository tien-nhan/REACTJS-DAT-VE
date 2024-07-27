import { useState } from "react";
import "./App.scss";
import { tables } from "./data";

function App() {
  const [state, _setState] = useState({ values: [], oldValues: [] });
  const setState = (data) => {
    _setState((pre) => ({ ...pre, ...data }));
  };
  const takeData = () => {
    if (!state.name || !state.number) {
      alert("Các bạn vui lòng nhập Tên và Số ghế");
      return;
    }
    setState({ valid: true });
  };
  const onChange = (key) => (e) => {
    const value = e?.target?.value;
    setState({ [key]: value });
  };
  const onChangeCheckbox = (value) => (e) => {
    if (!state.valid) {
      e.preventDefault();
      return;
    }
    const checked = e?.target?.checked;
    let newValues;
    if (
      checked &&
      state.values?.length < +state.number &&
      !state.oldValues?.includes(value)
    ) {
      newValues = [...state.values, value];
    } else if (
      !checked &&
      state.values.includes(value) &&
      !state.oldValues?.includes(value)
    ) {
      newValues = state.values.filter((o) => o !== value);
    } else {
      e.preventDefault();
      return;
    }
    setState({ values: newValues });
  };

  const onConfirm = (e) => {
    if (state.values?.length < +state.number) {
      alert(`Vui lòng chọn ${state.number} ghế`);
      return;
    } else if (state.isDone) {
      return;
    }
    setState({ isDone: true });
  };
  const onContinue = (e) => {
    _setState({ oldValues: [...state.oldValues, ...state.values], values: [] });
  };
  return (
    <>
      <div className="banner" />
      <h1 className="title">CHỌN GHẾ XEM PHIM</h1>
      <div class="pull-right toggle-right-sidebar">
        <span class="fa title-open-right-sidebar tooltipstered fa-angle-double-right"></span>
      </div>
      <div id="right-sidebar" class="right-sidebar-notifcations nav-collapse">
        <div
          class="bs-example bs-example-tabs right-sidebar-tab-notification"
          data-example-id="togglable-tabs"
        >
          <div id="w3lDemoBar" class="w3l-demo-bar">
            <div class="demo-btns">
              <a href="https://w3layouts.com/?p=45443">
                <span class="w3l-icon -back">
                  <span class="fa fa-arrow-left"></span>
                </span>
                <span class="w3l-text">Back</span>
              </a>
              <a href="https://w3layouts.com/?p=45443">
                <span class="w3l-icon -download">
                  <span class="fa fa-download"></span>
                </span>
                <span class="w3l-text">Download</span>
              </a>
              <a
                href="https://w3layouts.com/checkout/?add-to-cart=45443"
                class="no-margin-bottom-mobile"
              >
                <span class="w3l-icon -buy">
                  <span class="fa fa-shopping-cart"></span>
                </span>
                <span class="w3l-text">Buy</span>
              </a>
            </div>
            <div class="responsive-icons">
              <a href="#url" class="desktop-mode">
                <span class="w3l-icon -desktop">
                  <span class="fa fa-desktop"></span>
                </span>
              </a>
              <a href="#url" class="tablet-mode">
                <span class="w3l-icon -tablet">
                  <span class="fa fa-tablet"></span>
                </span>
              </a>
              <a href="#url" class="mobile-mode no-margin-bottom">
                <span class="w3l-icon -mobile">
                  <span class="fa fa-mobile"></span>
                </span>
              </a>
            </div>
          </div>
          <div
            class="right-sidebar-panel-content animated fadeInRight"
            tabindex="5003"
            style={{ overflow: "hidden", outline: "none" }}
          ></div>
        </div>
      </div>
      <div className="container">
        <div className="w3ls-reg">
          <div className="inputForm">
            <h2>Vui lòng điền các thông tin cần thiết bên dưới và chọn ghế của bạn</h2>
            <div className="mr_agilemain">
              <div className="agileits-left">
                <label>
                  Tên người mua
                  <span>*</span>
                </label>
                <input
                  type="text"
                  required=""
                  onChange={onChange("name")}
                  value={state.name || ""}
                  disabled={state.valid}
                />
              </div>
              <div className="agileits-right">
                <label>
                  Số lượng ghế sẽ đặt
                  <span>*</span>
                </label>
                <input
                  type="number"
                  id="Numseats"
                  required=""
                  min="1"
                  value={state.number || ""}
                  onChange={onChange("number")}
                  disabled={state.valid}
                />
              </div>
            </div>
            <button onClick={takeData}>Start Selecting</button>{" "}
          </div>
          <ul className="seat_w3ls">
            <li className="smallBox greenBox">Ghế đã chọn</li>

            <li className="smallBox redBox">Ghế đã đặt</li>

            <li className="smallBox emptyBox">Ghế trống</li>
          </ul>
          <div className="seatStructure">
            {state.valid && (
              <p id="notification">
                <b>Vui lòng chọn ghế của bạn NGAY BÂY GIỜ!</b>
              </p>
            )}
            <table id="seatsBlock">
              <tr>
                <td></td>
                {Array(12)
                  .fill(0)
                  .map((o, i) => (
                    <td>{i + 1}</td>
                  ))}
              </tr>
              {Object.entries(tables).map(([key, value]) => {
                return (
                  <tr>
                    <td>{key}</td>
                    {value.map((o, i) => (
                      <td>
                        <input
                          className={
                            state.values.includes(o)
                              ? "seats new"
                              : state.oldValues?.includes(o)
                              ? "seats old"
                              : ""
                          }
                          type="checkbox"
                          value={state.values.includes(o)}
                          onClick={onChangeCheckbox(o)}
                        />
                      </td>
                    ))}
                  </tr>
                );
              })}
            </table>
            <div className="screen">
              <h2 className="wthree">Màn hình ở đây</h2>
            </div>
            <button disabled={state.disableConfirm} onClick={onConfirm}>
              Confirm Selection
            </button>
            {state.isDone && (
              <button disabled={state.disableConfirm} onClick={onContinue}>
                Continue
              </button>
            )}
          </div>
          <div className="displayerBoxes">
            <table className="Displaytable w3ls-table" width="100%">
              <tbody>
                <tr>
                  <th>Tên</th>
                  <th>Số lượng ghế</th>
                  <th>Vị trí ghế</th>
                </tr>
                <tr>
                  <td>
                    <textarea
                      disabled
                      value={state.isDone ? state.name : ""}
                    ></textarea>
                  </td>
                  <td>
                    <textarea
                      disabled
                      value={state.isDone ? state.number : ""}
                    ></textarea>
                  </td>
                  <td>
                    <textarea
                      disabled
                      value={state.isDone ? state.values.join(",") : ""}
                    ></textarea>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="copy-wthree">
        <p>
          © 2018 Movie Seat Selection . All Rights Reserved | Design by
          <a href="https://w3layouts.com/" target="_blank">
            {" "}
            W3layouts
          </a>
        </p>
      </div>
    </>
  );
}

export default App;

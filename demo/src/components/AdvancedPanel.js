import { useEffect, useRef, useState } from "react";

export default function AdvancedPanel({
  onChange,
  renderContractField = false,
}) {
  const [contract, setContract] = useState("");
  const [capabilityFlags, setCapabilityFlags] = useState(0);
  const [endpoint, setEndpoint] = useState();
  const [instanttransfers, setInstantTransfers] = useState(false);
  const [hdrequired, setHDRequired] = useState(false);
  const [auxfeekeyid, setAuxFeeKeyID] = useState();
  const [auxfees, setAuxFees] = useState([]);
  const [notaryAddress, setNotaryAddress] = useState();

  const stateRef = useRef();
  stateRef.current = {
    contract,
    capabilityFlags,
    endpoint,
    instanttransfers,
    hdrequired,
    auxfeekeyid,
    auxfees,
    notaryAddress,
  };

  useEffect(() => {
    const inputs = document.querySelectorAll("input");

    const onChangeEvent = (event) => {
      onChange(stateRef.current);
    };

    if (typeof onChange === "function") {
      const evt = new Event("input");

      evt.simulated = true;

      inputs.forEach((input) => {
        input.dispatchEvent(evt);
        input.addEventListener("input", onChangeEvent);
      });
    }

    return () => {
      typeof onChange === "function" &&
        inputs.forEach((input) => {
          input.removeEventListener("input", onChangeEvent);
        });
    };
  }, []);

  const handleInputChange = (setState) => {
    return (event) => {
      const target = event.target;

      target.type !== "checkbox"
        ? setState(target.value)
        : setState(target.checked);
    };
  };

  const handleCapabilityFlags = (event) => {
    const value = Number(event.target.value);
    const isChecked = event.target.checked;

    setCapabilityFlags((prevValue) => {
      return isChecked ? prevValue + value : prevValue - value;
    });
  };

  const handleAddFee = (event) => {
    event.preventDefault();

    const bound = document.querySelector("#bound");
    const percent = document.querySelector("#percent");

    if (!bound.value || !percent.value) return;

    if ([bound.value, percent.value].some((v) => isNaN(Number(v)))) {
      bound.value = "";
      percent.value = "";

      return;
    }

    setAuxFees([...auxfees, { bound: bound.value, percent: percent.value }]);

    bound.value = "";
    percent.value = "";
  };

  const handleRemoveFee = (fee) => {
    return function (event) {
      event.preventDefault();

      const newAuxFees = auxfees.filter((f) => f !== fee);

      setAuxFees(newAuxFees);
    };
  };

  return (
    <div className="form-line gray">
      <div className="advanced-panel open">
        <div className="form-line">
          <div className="label-spacing">
            <label>Compliance & Business Rulesets</label>
          </div>
          <div className="form-group col-50 spaced col-sm-100">
            <label htmlFor="signer">
              Signer Address *{" "}
              <i className="icon-info-circled" title="help goes here"></i>
            </label>
            <input
              onChange={handleInputChange(setNotaryAddress)}
              type="text"
              className="form-control"
              id="signer"
              placeholder=""
            />
            <p className="help-block">
              Address that will notarize transactions
            </p>
          </div>
          <div className="form-group col-50 spaced col-sm-100">
            <label htmlFor="endpointurl">
              Endpoint URL *{" "}
              <i className="icon-info-circled" title="help goes here"></i>
            </label>
            <input
              onChange={handleInputChange(setEndpoint)}
              type="text"
              className="form-control"
              id="endpointurl"
              placeholder=""
            />
            <p className="help-block">URL to your notray API</p>
          </div>
          <div className="form-group col-100">
            <div className="checkbox small">
              <label>
                <input
                  onChange={handleInputChange(setInstantTransfers)}
                  type="checkbox"
                />
                Notary provides double-spend protection and guarantees safe
                instant transfers (Default: OFF)
              </label>
            </div>
            <div className="checkbox small">
              <label>
                <input
                  onChange={handleInputChange(setHDRequired)}
                  type="checkbox"
                />{" "}
                HD required for asset transfers (all senders must supply their
                XPUB & HD Path) (Default: OFF)
              </label>
            </div>
          </div>
        </div>

        <div className="form-line half">
          <div className="form-group col-100">
            <div className="label-spacing">
              <label>Issuer Rights</label>
            </div>
          </div>
          <div className="form-group col-100">
            <div className="checkbox small">
              <label>
                <input
                  onChange={handleCapabilityFlags}
                  type="checkbox"
                  value={4}
                />
                Issue supply into circulation (LOCKED - ALWAYS ON)
              </label>
            </div>
            <div className="checkbox small">
              <label>
                <input
                  onChange={handleCapabilityFlags}
                  type="checkbox"
                  value={1}
                />
                Edit field value: [public_value]
              </label>
            </div>
            <div className="checkbox small">
              <label>
                <input
                  onChange={handleCapabilityFlags}
                  type="checkbox"
                  value={2}
                />
                Edit field value: [contract]
              </label>
            </div>
            <div className="checkbox small">
              <label>
                <input
                  onChange={handleCapabilityFlags}
                  type="checkbox"
                  value={8}
                />
                Edit field value: [notary_address]
              </label>
            </div>
            <div className="checkbox small">
              <label>
                <input
                  onChange={handleCapabilityFlags}
                  type="checkbox"
                  value={16}
                />
                Edit field value: [notary_details]
              </label>
            </div>
            <div className="checkbox small">
              <label>
                <input
                  onChange={handleCapabilityFlags}
                  type="checkbox"
                  value={32}
                />
                Edit field value: [auxfee]
              </label>
            </div>
            <div className="checkbox small">
              <label>
                <input
                  onChange={handleCapabilityFlags}
                  type="checkbox"
                  value={64}
                />
                Edit field value: [capability_flags]
              </label>
            </div>
          </div>
        </div>

        <div className="form-line half right">
          <div className="form-group col-100">
            <div className="label-spacing">
              <label>Auxiliary Fees</label>
            </div>
          </div>
          <div className="form-group col-100 spaced">
            <label htmlFor="payout">
              Payout Address *{" "}
              <i className="icon-info-circled" title="help goes here"></i>
            </label>
            <input
              onChange={handleInputChange(setAuxFeeKeyID)}
              type="text"
              className="form-control"
              id="payout"
              placeholder=""
            />
          </div>
          <div className="form-group col-100">
            <div className="row nested">
              <div className="form-group col-40">
                <p className="help-block">Bound</p>
              </div>
              <div className="form-group col-40">
                <p className="help-block">Percent</p>
              </div>
            </div>
            {auxfees.map((fee, i) => (
              <div className="row nested" key={i}>
                <div className="form-group col-40">
                  <input
                    value={fee.bound}
                    disabled
                    type="text"
                    className="form-control"
                  />
                </div>
                <div className="form-group col-40">
                  <input
                    value={fee.percent}
                    disabled
                    type="text"
                    className="form-control"
                  />
                </div>
                <div className="form-group col-20">
                  <button className="small" onClick={handleRemoveFee(fee)}>
                    <i className="icon-cancel"></i>
                  </button>
                </div>
              </div>
            ))}

            <div className="row nested">
              <div className="form-group col-40">
                <input type="text" className="form-control" id="bound" />
              </div>
              <div className="form-group col-40">
                <input type="text" className="form-control" id="percent" />
              </div>
              <div className="form-group col-20">
                <button className="small" onClick={handleAddFee}>
                  <i className="icon-plus"></i>
                </button>
              </div>
            </div>

            <div className="row nested">
              <div className="col-100">
                <p className="help-block">
                  At least one Bound | Percent pair is required
                </p>
              </div>
            </div>
          </div>
        </div>

        {renderContractField && (
          <div className="form-line spaced-top">
            <div className="form-group col-100">
              <label htmlFor="contract">
                Contract{" "}
                <i className="icon-info-circled" title="help goes here"></i>
              </label>
              <input
                onChange={handleInputChange(setContract)}
                type="text"
                className="form-control"
                id="contract"
                placeholder=""
              />
              <p className="help-block">
                ERC-20 Contract linked to this token via Syscoin Bridge
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

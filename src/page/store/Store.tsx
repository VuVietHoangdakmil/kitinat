import React, { useState, useEffect, useMemo } from "react";
import Map from "../../components/map/Map";
import { Col, Image, Row } from "antd";
import { getStore } from "../../services/stores.service";
import { Store } from "../../types/data/store";
import { Location } from "../../components/map/Map";
import cn from "classnames";
const StoreCard = ({
  store,
  onClick,
  center,
}: {
  store: Store;
  onClick: () => void;
  center: [number, number];
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "flex p-2  hover:cursor-pointer hover:opacity-60 overflow-hidden h-[150px] bg-[#f8f6f3]",
        {
          ["opacity-60"]:
            center[0] === store?.latitude && center[1] === store?.longitude,
        }
      )}
    >
      <div className="flex items-center justify-center">
        <Image
          className="rounded-lg"
          width={70}
          height={120}
          style={{ objectFit: "cover" }}
          src={store.images}
          alt={store.name}
        />
      </div>
      <div className="ml-5">
        <h1 className="text-3xl text-[var(--primary-color)] font-bold">
          {store.name}
        </h1>
        <p className="text-[#404040]">{store.address}</p>
      </div>
    </div>
  );
};
const StorePage = () => {
  const [center, setCenter] = useState<[number, number]>([16.0544, 108.2022]);
  const [zoom, setZoom] = useState(6);

  const [store, setStore] = useState<Store[]>([]);
  const handleLocationChange = (lat: number, lng: number) => {
    setCenter([lat, lng]);
    setZoom(15); // Đặt mức zoom cao hơn
  };
  useEffect(() => {
    const fetchStore = async () => {
      const store = (await getStore()) as any;
      setStore(store as Store[]);
    };
    fetchStore();
  }, []);
  const UiStore = useMemo(
    () =>
      store.map((store) => (
        <StoreCard
          center={center}
          store={store}
          onClick={() => {
            handleLocationChange(store?.latitude ?? 0, store?.longitude ?? 0);
          }}
        />
      )),
    [store.length, center[0], center[1]]
  );
  const locations: Location[] = useMemo(
    () =>
      store.map((item) => ({
        lat: item.latitude ?? 0,
        lng: item.longitude ?? 0,
        name: item.name ?? "",
      })),
    [store.length]
  );
  return (
    <>
      <h1 className="mt-10 text-center text-6xl text-[var(--primary-color)] font-bold">
        Của hàng của chúng tôi
      </h1>
      <Row className="mt-20 px-10" gutter={5}>
        <Col style={{ height: "82vh", overflowY: "auto" }} span={5}>
          {UiStore}
        </Col>
        <Col span={19}>
          <Map
            style={{ height: "82vh", width: "100%" }}
            locations={locations}
            center={center}
            zoom={zoom}
            disableEventHandlers={true}
          />
        </Col>
      </Row>
    </>
  );
};

export default StorePage;

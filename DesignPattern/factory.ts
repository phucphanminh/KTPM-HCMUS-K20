// DESIGN PATTERN FACTORY

enum Type {
    SHIP,
    PLANE, TRUCK
}

interface Vehicle {
    move(): void
}

class Plane implements Vehicle {
    move(): void {
        console.log("move on the sky");
    }
}
class Truck implements Vehicle {
    move(): void {
        console.log("move on the ground");
    }
}
class Ship implements Vehicle {
    move(): void {
        console.log("move on the sea");
    }
}
abstract class Factory {
    private static instance: Factory | null = null;

    static getInstance():Factory {
        if (!Factory.instance) {
            Factory.instance = new TruckFactory();
        }
        return Factory.instance
    }

    abstract factoryMethod(): Vehicle
    getVehicle(): Vehicle {
        const vehicle: Vehicle = this.factoryMethod();
        return vehicle;
    }
}

class TruckFactory extends Factory {
    factoryMethod(): Vehicle {
        return new Truck()
    }
}
class ShipFactory extends Factory {
    factoryMethod(): Vehicle {
        return new Ship()
    }
}
class PlaneFactory extends Factory {
    factoryMethod(): Vehicle {
        return new Plane()
    }
}


//Composite Factory Types in this function
function getVehicle(type: Type): Vehicle {
    let factory: Factory=Factory.getInstance();
    switch (type) {
        case Type.SHIP:
            factory = new ShipFactory();
            break
        case Type.PLANE:
            factory = new PlaneFactory();
            break
        case Type.TRUCK:
            factory = new TruckFactory();
            break
        default:
            throw Error()

    }
    return factory.getVehicle()
}

let orders: Array<Type> = new Array<Type>(Type.PLANE, Type.SHIP, Type.PLANE, Type.TRUCK, Type.PLANE, Type.TRUCK, Type.PLANE, Type.SHIP, Type.TRUCK)


const handleOrders = (orders: Type[]) => {
    return orders.map(type => getVehicle(type))
}

let products = handleOrders(orders)

products.forEach(product => product.move())


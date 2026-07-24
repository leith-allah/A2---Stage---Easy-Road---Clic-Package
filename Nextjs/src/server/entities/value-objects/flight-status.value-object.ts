
export enum FlightStatusValue {

    ACTIVE = "ACTIVE",

    INACTIVE = "INACTIVE",

    ARCHIVED = "ARCHIVED",

}

export class FlightStatus {

    constructor(

        private value: FlightStatusValue,

    ) {}

    activate() {

        this.value = FlightStatusValue.ACTIVE;

    }

    inactivate() {

        this.value = FlightStatusValue.INACTIVE;

    }

    archive() {

        this.value = FlightStatusValue.ARCHIVED;

    }

    isActive() {

        return this.value === FlightStatusValue.ACTIVE;

    }

    isInactive() {

        return this.value === FlightStatusValue.INACTIVE;

    }

    isArchived() {

        return this.value === FlightStatusValue.ARCHIVED;

    }

    getValue() {

        return this.value;

    }

}

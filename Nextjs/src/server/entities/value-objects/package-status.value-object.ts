
export enum PackageStatusValue {

    DRAFT = "DRAFT",

    ACTIVE = "ACTIVE",

    INACTIVE = "INACTIVE",

    ARCHIVED = "ARCHIVED",

}

export class PackageStatus {

  constructor(

    private value: PackageStatusValue,

  ) {}

  publish() {

      this.value = PackageStatusValue.ACTIVE;

  }

  activate() {

      this.value = PackageStatusValue.ACTIVE;

  }

  disable() {
      this.value = PackageStatusValue.INACTIVE;
  }

  archive() {

      this.value = PackageStatusValue.ARCHIVED;

  }

  draft() {

      this.value = PackageStatusValue.DRAFT;

  }

  isPublished() {

      return this.value === PackageStatusValue.ACTIVE;

  }

  isInactive() {

      return this.value === PackageStatusValue.INACTIVE;

  }

  isArchived() {

      return this.value === PackageStatusValue.ARCHIVED;

  }

  isDraft() {

      return this.value === PackageStatusValue.DRAFT;

  }

  getValue() {

    return this.value;

  }

}

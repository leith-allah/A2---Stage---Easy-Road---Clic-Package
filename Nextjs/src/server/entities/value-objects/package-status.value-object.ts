
export enum PackageStatusValue {

  DRAFT = "DRAFT",

  PUBLISHED = "PUBLISHED",

  ARCHIVED = "ARCHIVED",

}

export class PackageStatus {

  constructor(

    private value: PackageStatusValue,

  ) {}

  publish() {

    this.value =

      PackageStatusValue.PUBLISHED;

  }

  archive() {

    this.value =

      PackageStatusValue.ARCHIVED;

  }

  draft() {

    this.value =

      PackageStatusValue.DRAFT;

  }

  isPublished() {

    return this.value ===

      PackageStatusValue.PUBLISHED;

  }

  isArchived() {

    return this.value ===

      PackageStatusValue.ARCHIVED;

  }

  isDraft() {

    return this.value ===

      PackageStatusValue.DRAFT;

  }

  getValue() {

    return this.value;

  }

}

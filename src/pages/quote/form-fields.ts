import isemail from "isemail";

import {
  ArtworkType,
  MountType,
  GlassType,
  WoodFinishType,
  WoodMaterialType,
} from "../../../types/form";

export const initialFormState = {
  name: "",
  email: "",
  optIn: false,
  artworkType: "print",
  artworkHeight: 0,
  artworkWidth: 0,
  mountType: "notSure",
  glassType: "notSure",
  woodFinishType: "notSure",
  woodMaterialType: "notSure",
};

export const isWoodFinishDisabled = (
  formValues: typeof initialFormState,
  woodFinishType: WoodFinishType
): boolean => {
  const allowedFinishes: { [key: string]: WoodFinishType[] } = {
    oak: [
      WoodFinishType.black,
      WoodFinishType.natural,
      WoodFinishType.waxed,
      WoodFinishType.notSure,
    ],
    ash: [
      WoodFinishType.black,
      WoodFinishType.white,
      WoodFinishType.natural,
      WoodFinishType.waxed,
      WoodFinishType.notSure,
    ],
    beech: [WoodFinishType.waxed, WoodFinishType.notSure],
    tulip: [
      WoodFinishType.paint,
      WoodFinishType.white,
      WoodFinishType.waxed,
      WoodFinishType.notSure,
    ],
    lime: [WoodFinishType.waxed, WoodFinishType.notSure],
    walnut: [WoodFinishType.waxed, WoodFinishType.notSure],
    notSure: Object.values(WoodFinishType),
  };
  return !allowedFinishes[formValues.woodMaterialType].includes(woodFinishType);
};

export const isWoodMaterialDisabled = (
  formValues: typeof initialFormState,
  woodMaterialType: WoodMaterialType
): boolean => {
  const defaultMaterials = [WoodMaterialType.notSure];
  const allowedMaterials: { [key: string]: WoodMaterialType[] } = {
    paint: [WoodMaterialType.tulip, ...defaultMaterials],
    black: [WoodMaterialType.ash, WoodMaterialType.oak, ...defaultMaterials],
    white: [WoodMaterialType.ash, WoodMaterialType.tulip, ...defaultMaterials],
    natural: [WoodMaterialType.ash, WoodMaterialType.oak, ...defaultMaterials],
    waxed: [...Object.values(WoodMaterialType)],
    notSure: [...Object.values(WoodMaterialType)],
  };
  return !allowedMaterials[formValues.woodFinishType].includes(
    woodMaterialType
  );
};

export const formFields = {
  artworkType: Object.keys(ArtworkType).map((key) => {
    return {
      type: key as keyof typeof ArtworkType,
      display: ArtworkType[key as keyof typeof ArtworkType],
    };
  }),
  mountType: Object.keys(MountType).map((key) => {
    return {
      type: key as keyof typeof MountType,
      display: MountType[key as keyof typeof MountType],
    };
  }),
  glassType: Object.keys(GlassType).map((key) => {
    return {
      type: key as keyof typeof GlassType,
      display: GlassType[key as keyof typeof GlassType],
    };
  }),
  woodFinishType: Object.keys(WoodFinishType).map((key) => {
    return {
      type: key as keyof typeof WoodFinishType,
      display: WoodFinishType[key as keyof typeof WoodFinishType],
      isDisabled: (formValues: typeof initialFormState) =>
        isWoodFinishDisabled(
          formValues,
          WoodFinishType[key as keyof typeof WoodFinishType]
        ),
    };
  }),
  woodMaterialType: Object.keys(WoodMaterialType).map((key) => {
    return {
      type: key as keyof typeof WoodMaterialType,
      display: WoodMaterialType[key as keyof typeof WoodMaterialType],
      isDisabled: (formValues: typeof initialFormState) =>
        isWoodMaterialDisabled(
          formValues,
          WoodMaterialType[key as keyof typeof WoodMaterialType]
        ),
    };
  }),
};

export const validationSchema = {
  name: (name: string) => {
    const isValid = !!name && name.length > 2;
    const message = isValid ? "" : "Please provide your name";
    return { isValid, message };
  },
  email: (email: string) => {
    const isValid = isemail.validate(email, { minDomainAtoms: 2 });
    const message = isValid ? "" : "Please provide a valid email";
    return { isValid, message };
  },
};

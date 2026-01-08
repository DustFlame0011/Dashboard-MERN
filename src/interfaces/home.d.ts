export interface PieChartProps {
    title: string,
    value: number,
    series: Array<number>;
    colors: Array<string>;
}

export interface FormProps {
  type: string;
  register: any;
  onFinish: (
    values: FieldValues,
  ) => Promise<void | CreateResponse | UpdateResponse>;
  formLoading: boolean;
  handleSubmit: FormEventHandler<HTMLFormElement> | undefined;
  handleImageChange: (file: any) => void;
  onFinishHandler: (
    values: FieldValues,
  ) => Promise<void> | void;
  propertyImages: { name:string; url: string };
}
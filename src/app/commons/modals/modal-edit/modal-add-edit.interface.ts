export interface I_ModalData {
  title: string;
  textButton: string;
  dataEdit: I_ModalItems;
}

export interface I_ModalItems {
  id?: string;
  title: string;
  description: string;
  published?: boolean;
  status: string;
}

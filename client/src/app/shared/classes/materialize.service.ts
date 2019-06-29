declare var M;

export class MaterializeService {
  static toast(message: string): void {
    M.toast({html: message});
  }

  static updateTextFields(): void {
    M.updateTextFields();
  }
}

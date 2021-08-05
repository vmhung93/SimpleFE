import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toastrService: ToastrService) {}

  private toastrOptions = {
    timeOut: 5000,
    enableHtml: true,
  };

  show(
    message?: string,
    title?: string,
    from: string = 'bottom',
    align: string = 'right'
  ) {
    this.toastrService.show(message, title, {
      ...this.toastrOptions,
      ...{
        positionClass: 'toast-' + from + '-' + align,
      },
    });
  }

  showInfo(
    message?: string,
    title?: string,
    from: string = 'bottom',
    align: string = 'right'
  ) {
    this.toastrService.info(message, title, {
      ...this.toastrOptions,
      ...{
        positionClass: 'toast-' + from + '-' + align,
      },
    });
  }

  showSuccess(
    message?: string,
    title?: string,
    from: string = 'bottom',
    align: string = 'right'
  ) {
    this.toastrService.success(message, title, {
      ...this.toastrOptions,
      ...{
        positionClass: 'toast-' + from + '-' + align,
      },
    });
  }

  showWarning(
    message?: string,
    title?: string,
    from: string = 'bottom',
    align: string = 'right'
  ) {
    this.toastrService.warning(message, title, {
      ...this.toastrOptions,
      ...{
        positionClass: 'toast-' + from + '-' + align,
      },
    });
  }

  showError(
    message?: string,
    title?: string,
    from: string = 'bottom',
    align: string = 'right'
  ) {
    this.toastrService.error(message, title, {
      ...this.toastrOptions,
      ...{
        positionClass: 'toast-' + from + '-' + align,
      },
    });
  }
}

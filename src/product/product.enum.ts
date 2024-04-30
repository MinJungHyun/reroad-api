export enum RequestTokenValidationStatus {
  VALID = 'VALID',
  INVALID = 'INVALID',
  EXPIRED = 'EXPIRED'
}

export enum TransactionType {
  SALE = 'SALE', // 판매
  EXCHANGE = 'EXCHANGE', // 교환
  PURCHASE = 'PURCHASE', // 구매
  FREE = 'FREE' // 나눔
}

// 거래 상태를 나타내는 열거형
export enum TransactionState {
  ONGOING = 'ONGOING', // 진행 중
  COMPLETED = 'COMPLETED', // 완료됨
  CANCELLED = 'CANCELLED' // 취소됨
}

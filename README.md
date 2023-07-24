# KTPM-HCMUS-K20

Working with Git
_ Nhánh chính là nhánh Master chứa code chung, không được push code trực tiếp vào nhánh này mà phải checkout nhánh khác và tạo Pull Request .

_ Lưu ý khi checkout giữa các nhánh

force checkout: bỏ tất cả những thay đổi chưa commit của mình -> mình dev gì sẽ biến mất hết khi qua nhánh mới (sau này checkout lại nhánh cũ code cũng mất tiêu luôn)
checkout: mang thay đổi từ nhánh cũ qua nhánh mới
stash: lưu lại các thay đổi ở nhánh cũ vào ngăn stash và checkout qua nhánh mới (các code chưa commit sẽ không có ở cả nhánh mới và nhánh cũ, khi bạn từ nhánh mới checkout về nhánh cũ và unstash nó sẽ hiện ra lại)
_ Quy trình làm việc với git khi thêm tính năng mới:

git checkout master
git pull
git checkout -b Feature/MyBranch
_ Quy trình tạo Pull Request

git checkout master
git pull
git checkout Feature/MyBranch
git merge main
_ Việc luôn checkout master và pull master giúp cho code master ở local của chúng ta luôn mới để tránh code ở local đã quá cũ sau này resolve conflict sẽ rất mệt.

Coding Conventions
Fields: var orangeJuice
Properties: var OrangeJuice
Arguments: int Add(int numOne, int numTwo)
Functions: int AddTwoDecimals(int num1, int num2)
Private members: private int _recordTime
Clean code
Các quy tắc clean code cơ bản nên theo:

Một hàm hay một lớp chỉ đảm nhiệm duy nhất 1 nhiệm vụ (đọc thêm SOLID PRINCIPLES).
Hardcode các hằng số (nên tạo các file hằng số để dùng chung cho cả dự án).
Không viết tách hàm và tận dụng lại hàm.
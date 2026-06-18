#include <stdio.h>
#define SIZE 10
int linearsearch(int a[], int n, int key);
int main()
{
    int arr[SIZE] = {10, 9, 8, 7, 6, 5, 4, 3, 2, 1};
    int search = 0;
    printf("Enter the value you want to find: ");
    scanf("%d", &search);
    int index = linearsearch(arr, SIZE, search);
    if (index != -1)
    {
        printf("Yes! The index is %d", index);
    }
    else
    {
        puts("Not found");
    }
    return 0;
}
int linearsearch(int a[], int n, int key)
{
    for (size_t i = 0; i < n; i++)
    {
        if (key == a[i])
        {
            return i;
        }
    }
    return -1;
}
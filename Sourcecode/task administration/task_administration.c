#include <stdio.h>
#include <unistd.h>
#include <sys/epoll.h>
#include <fcntl.h>
#include <limits.h>
#include <string.h>

int main(int argc, char const* argv[])
{
    char* endPath = "/../WebServer/task_administration_config.txt";
    char basePath[PATH_MAX];
    char path[PATH_MAX + strlen(endPath)];

    if(getcwd(basePath, sizeof(basePath)) == NULL)
    {
        printf("Failed to get the path\n");
    }

    strcpy(path, basePath);
    strcat(path, endPath);
    int epoll_fd = epoll_create1(0);
    int file_fd = open(path, O_RDONLY);

    if(epoll_fd == -1)
    {
        fprintf(stderr, "Failed to create epoll file descriptor\n");
        return 1;
    }

    if(file_fd == -1)
    {
        fprintf(stderr, "Failed to create file descriptor\n");
        return 1;
    }

    struct epoll_event event;

    event.events = EPOLLIN;

    event.data.fd = file_fd;

    if(epoll_ctl(epoll_fd, EPOLL_CTL_ADD, file_fd, &event))
    {
        fprintf(stderr, "Failed to add file descriptor to epoll\n");
        close(epoll_fd);
        return 1;
    }

    if(close(file_fd))
    {
        fprintf(stderr, "Failed to close file descriptor\n");
        return 1;
    }

    if(close(epoll_fd))
    {
        fprintf(stderr, "Failed to close epoll file descriptor\n");
        return 1;
    }

    return 0;
}




